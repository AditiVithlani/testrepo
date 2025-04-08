const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { tbl_Company_detail } = require('../models'); 

// Secret key for JWT
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

class CompanyController {

  static async addCompany(req, res) {
    try {
      const { gst_no, email, password, business_sub_category_id, created_by } = req.body;
      // Validate required fields
      if (!gst_no || !email || !password || !business_sub_category_id) {
        return res.status(400).json({ error: 'Missing required fields.' });
      }

      // Check if GST number is unique
      const existingCompany = await tbl_Company_detail.findOne({ where: { gst_no :gst_no } });
      if (existingCompany) {
        return res.status(409).json({ error: 'Company with this GST number already exists.' });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new company record
      const newCompany = await tbl_Company_detail.create({
        gst_no,
        email,
        password: hashedPassword, 
        business_sub_category_id,
        created_by: created_by || 'system',
        created_datetime: new Date(),
      });

      // Exclude sensitive fields (e.g., password) before sending the response
      const { password: _, ...responseData } = newCompany.toJSON();

      return res.status(201).json({ message: 'Company added successfully.', data: responseData });
    } catch (error) {
      console.error('Error adding company:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }


  static async login(req, res) {
    
    const { gst_no, password } = req.body; 
    try {
      // Validate input
      if (!gst_no || !password) {
        return res.status(400).json({ message: 'GST number and password are required.' });
      }

      // Find the company by GST number
      const company = await tbl_Company_detail.findOne({ where: { gst_no } });

      if (!company) {
        return res.status(404).json({ message: 'Company not found with the provided GST number.' });
      }

      // Compare the password
      const isPasswordValid = await bcrypt.compare(password, company.password);

      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid GST number or password.' });
      }

      // Generate JWT
      const token = jwt.sign(
        { id: company.id, gst_no: company.gst_no }, // Include GST number in the payload
        JWT_SECRET,
        { expiresIn: '1h' }
      );

      // Respond with the token
      return res.status(200).json({
        message: 'Login successful.',
        token,
      });
    } catch (error) {
      console.error('Error during login:', error);
      return res.status(500).json({ message: 'Internal server error.' });
    }
  }
  }


module.exports = CompanyController;
