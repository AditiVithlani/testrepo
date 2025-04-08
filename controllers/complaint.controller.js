const { 
    tbl_complaint, 
    tbl_vender_complain_detail, 
    tbl_company_complain_detail, 
    tbl_document_details, 
    tbl_document_type, 
    sequelize // Ensure Sequelize instance is imported
  } = require('../models');
  const { Op } = require('sequelize'); // Import Sequelize operators

  // Function to generate a random complaint number
  function generateComplaintNumber() {
    const prefix = 'CMP-';
    const timestamp = new Date().toISOString().replace(/[-T:\.Z]/g, '').slice(0, 8);
    const randomPart = Math.random().toString(36).substring(2, 10).toUpperCase();
    return `${prefix}${timestamp}-${randomPart}`;
  }
  
  // Common function to create document IDs within a transaction
  async function createDocument(url, documentType, isVendor, transaction) {
    try {
      console.log("URL:", url);
      console.log("Is Vendor:", isVendor);
      console.log("Document Type:", documentType);
  
      const documentTypeData = await tbl_document_type.findOne({
        where: { documents_type: documentType },
        transaction
      });
  
      if (!documentTypeData) {
        throw new Error(`Document type '${documentType}' not found`);
      }
  
      console.log("Fetched Document Type ID:", documentTypeData.id);
  
      const document = await tbl_document_details.create({
        document_url: url,
        is_vender_document: isVendor,
        document_type_id: documentTypeData.id
      }, { transaction });
  
      return document.id;
    } catch (error) {
      throw new Error('Error while creating document: ' + error.message);
    }
  }
  
  // Validation function for vendor and company-specific fields
  function validateFields(req, isVendor) {
    const errors = [];
    if (!req.body.gst_no) errors.push('GST No is required for complaints');
    if (!req.body.mobile_no) errors.push('Mobile No is required for complaints');
    if (!req.body.email) errors.push('Email is required for complaints');
  
    if (isVendor) {
      if (!req.body.Proforma_Invoice_No) errors.push('Proforma Invoice No is required for vendor complaints');
      if (!req.body.Proforma_Invoice_Date) errors.push('Proforma Invoice Date is required for vendor complaints');
    } else {
      if (!req.body.PO_No) errors.push('PO No is required for customer complaints');
      if (!req.body.PO_Date) errors.push('PO Date is required for customer complaints');
      if (!req.body.ack_po_copy_url) errors.push('PO copy URL is required for customer complaints');
      if (!req.body.invoice_no) errors.push('Invoice no is required for customer complaints');
      if (!req.body.invoice_date) errors.push('Invoice date is required for customer complaints');
      if (!req.body.ack_invoice_copy_url) errors.push('Invoice copy URL is required for customer complaints');
      if (!req.body.payment_mode) errors.push('Payment mode is required for customer complaints');
      if (!req.body.pending_amout) errors.push('Pending amount is required for customer complaints');
    }
  
    return errors;
  }
  
  class ComplaintController {
    // Main controller function for raising complaints with transaction handling
    static async raiseComplaint(req, res) {
      const {
        gst_no, mobile_no, alternate_mobile_no, email, alternate_email, 
        is_vendor, ack_copy_url, ack_po_copy_url, ack_invoice_copy_url, 
        ca_certified_ac_ledger_url, return_cheque_url,
        Proforma_Invoice_No, Proforma_Invoice_Date, PO_No, PO_Date, 
        invoice_no, invoice_date, pending_amout, payment_mode
      } = req.body;
  
      const transaction = await sequelize.transaction(); // Start transaction
  
      try {
        console.log("Received request body:", req.body);
  
        // Step 1: Generate random complaint number
        const complaint_number = generateComplaintNumber();
        console.log("Generated complaint number:", complaint_number);
  
        // Step 2: Validate required fields based on is_vendor
        const validationErrors = validateFields(req, is_vendor);
        if (validationErrors.length > 0) {
          await transaction.rollback(); // Rollback transaction on validation failure
          return res.status(400).json({ errors: validationErrors });
        }
  
        let ackCopyDocId, ackPoCopyDocId, ackInvoiceCopyDocId, caCertLedgerDocId, returnChequeDocId;
  
        // Step 3: Create documents and retrieve their IDs if they are provided
        if (is_vendor) {
          ackCopyDocId = ack_copy_url ? await createDocument(ack_copy_url, 'Acknowledgement Copy', is_vendor, transaction) : null;
        } else {
          ackPoCopyDocId = ack_po_copy_url ? await createDocument(ack_po_copy_url, 'PO Copy', is_vendor, transaction) : null;
          ackInvoiceCopyDocId = ack_invoice_copy_url ? await createDocument(ack_invoice_copy_url, 'Invoice Copy', is_vendor, transaction) : null;
          caCertLedgerDocId = ca_certified_ac_ledger_url ? await createDocument(ca_certified_ac_ledger_url, 'CA Certified Ledger', is_vendor, transaction) : null;
          returnChequeDocId = return_cheque_url ? await createDocument(return_cheque_url, 'Return Cheque Copy', is_vendor, transaction) : null;
        }
  
        // Step 4: Prepare and insert complaint details
        let complaintDetails, complaintRecord;
        if (is_vendor) {
          complaintDetails = {
            Proforma_Invoice_No,
            Proforma_Invoice_Date: Proforma_Invoice_Date ? Proforma_Invoice_Date : null,
            ack_copy_url_id: ackCopyDocId,
            created_by: 'system',
            created_datetime: new Date(),
            updated_by: 'system',
            updated_datetime: new Date(),
          };
  
          const vendorComplaint = await tbl_vender_complain_detail.create(complaintDetails, { transaction });
          console.log("Vendor complaint created with ID:", vendorComplaint.id);
  
          complaintRecord = await tbl_complaint.create({
            complaint_number,
            gst_no,
            mobile_no,
            alternate_mobile_no,
            email,
            alternate_email,
            is_vendor,
            vender_complain_detail_id: vendorComplaint.id,
            created_by: 'system',
            created_datetime: new Date(),
            updated_by: 'system',
            updated_datetime: new Date(),
          }, { transaction });
        } else {
          complaintDetails = {
            PO_No,
            PO_Date,
            payment_mode,
            ack_po_copy_url_id: ackPoCopyDocId,
            invoice_no,
            invoice_date,
            ack_invoice_copy_url_id: ackInvoiceCopyDocId,
            ca_certified_ac_ledger_url_id: caCertLedgerDocId,
            return_cheque_url_id: returnChequeDocId,
            pending_amout,
            created_by: 'system',
            created_datetime: new Date(),
            updated_by: 'system',
            updated_datetime: new Date(),
          };
  
          const companyComplaint = await tbl_company_complain_detail.create(complaintDetails, { transaction });
          console.log("Company complaint created with ID:", companyComplaint.id);
  
          complaintRecord = await tbl_complaint.create({
            complaint_number,
            gst_no,
            mobile_no,
            alternate_mobile_no,
            email,
            alternate_email,
            is_vendor,
            company_complain_detail_id: companyComplaint.id,
            created_by: 'system',
            created_datetime: new Date(),
            updated_by: 'system',
            updated_datetime: new Date(),
          }, { transaction });
        }
  
        await transaction.commit(); // Commit transaction if everything is successful
        res.status(201).json({ message: 'Complaint raised successfully.', complaint_number });
  
      } catch (error) {
        await transaction.rollback(); // Rollback transaction on error
        console.error("Error while raising complaint:", error.message);
        res.status(500).json({ message: error.message || 'An error occurred while raising the complaint.' });
      }
    }

    static async getAllComplaints(req, res) {
        try {
            let { page, limit, search } = req.query;
            page = parseInt(page) || 1;
            limit = parseInt(limit) || 10;
            const offset = (page - 1) * limit;
        
             // Define search conditions if search param is provided
      const whereCondition = {};
      if (search) {
        whereCondition[Op.or] = [
          { gst_no: { [Op.like]: `%${search}%` } }, // Search by GST number
          { complaint_number: { [Op.like]: `%${search}%` } }, // Search by complaint number
        ];
      }
            const complaints = await tbl_complaint.findAndCountAll({
                where: whereCondition,
              limit,
              offset,
              include: [
                {
                  model: tbl_vender_complain_detail,
                  as: 'vendorComplaint',
                },
                {
                  model: tbl_company_complain_detail,
                  as: 'companyComplaint',
                },
              ],
              order: [['created_datetime', 'DESC']],
            });
        
            res.status(200).json({
              totalComplaints: complaints.count,
              totalPages: Math.ceil(complaints.count / limit),
              currentPage: page,
              complaints: complaints.rows,
            });
          } catch (error) {
            console.error('Error fetching complaints:', error);
            res.status(500).json({
              message: 'Internal Server Error',
              error: error.message,
            });
          }
      }
      static async closeComplaint(req, res) {
        try {
          const { complaint_number } = req.body; // Get complaint number from request body
    
          // Validate input
          if (!complaint_number) {
            return res.status(400).json({ error: 'Complaint number is required.' });
          }
    
          // Find complaint by complaint_number
          const complaint = await tbl_complaint.findOne({ where: { complaint_number } });
    
          if (!complaint) {
            return res.status(404).json({ error: 'Complaint not found.' });
          }
    
          // Update isClosed flag to true
          await complaint.update({ isClosed: true });
    
          return res.status(200).json({
            message: 'Complaint closed successfully.',
            data: {
              complaint_number: complaint.complaint_number,
              isClosed: complaint.isClosed,
            },
          });
    
        } catch (error) {
          console.error('Error closing complaint:', error);
          return res.status(500).json({ error: 'Internal Server Error' });
        }
      }
  }
  
  module.exports = ComplaintController;
  