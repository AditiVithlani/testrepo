const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { tbl_business_category, tbl_business_sub_category, tbl_document_type } = require('../models');


class CommonController {
  
  // Fetch all categories
  static async getCategories(req, res) {
    try {
      const categories = await tbl_business_category.findAll({
        attributes: ['id', 'category_name'],
        order: [['category_name', 'ASC']],
      });

      res.status(200).json(categories);
    } catch (error) {
      console.error('Error fetching categories:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  // Fetch all subcategories
  static async getSubcategories(req, res) {
    try {
      const subcategories = await tbl_business_sub_category.findAll({
        attributes: ['id', 'sub_category_name', 'business_category_id'],
        include: [
            {
              model: tbl_business_category,
              attributes: ['category_name'],
              as: 'category', 
            },
          ],
        order: [['sub_category_name', 'ASC']],
      });

      res.status(200).json(subcategories);
    } catch (error) {
      console.error('Error fetching subcategories:', error);
      res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
  }

  // Fetch all document types
  static async getDocumentTypes(req, res) {
    try {
      const documentTypes = await tbl_document_type.findAll({
        attributes: ['id', 'documents_type'],
        order: [['documents_type', 'ASC']],
      });

      res.status(200).json(documentTypes);
    } catch (error) {
      console.error('Error fetching document types:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }



}

module.exports = CommonController;
