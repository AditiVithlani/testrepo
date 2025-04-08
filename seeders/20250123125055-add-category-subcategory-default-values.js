'use strict';

// Importing models
const { tbl_business_category, tbl_business_sub_category } = require('../models');

module.exports = {
  async up(queryInterface, Sequelize) {
    const categories = [
      {
        category_name: 'Agriculture & Agribusiness',
        subcategories: [
          'Crop Production',
          'Animal Husbandry',
          'Dairy Farming',
          'Agrochemicals',
          'Food Processing',
        ],
      },
      {
        category_name: 'Automotive & Transportation',
        subcategories: [
          'Automobile Manufacturing',
          'Auto Components',
          'Logistics & Supply Chain',
          'Public Transport',
        ],
      },
      {
        category_name: 'Chemical & Petrochemical',
        subcategories: [
          'Chemical Manufacturing',
          'Pharmaceuticals',
          'Fertilizers',
          'Oil & Gas',
          'Petrochemicals',
        ],
      },
      {
        category_name: 'Engineering & Manufacturing',
        subcategories: [
          'Mechanical Engineering',
          'Electrical Engineering',
          'Civil Engineering',
          'Industrial Equipment Manufacturing',
          'Robotics & Automation',
        ],
      },
      {
        category_name: 'Information Technology (IT) & Software',
        subcategories: [
          'IT Services',
          'Software Development',
          'Cybersecurity',
          'Cloud Computing',
          'Artificial Intelligence',
        ],
      },
      {
        category_name: 'Construction & Real Estate',
        subcategories: [
          'Residential & Commercial Real Estate',
          'Infrastructure Development',
          'Building Materials Manufacturing',
          'Property Management',
        ],
      },
      {
        category_name: 'Finance & Banking',
        subcategories: [
          'Banking Services',
          'Insurance',
          'Investment Management',
          'Accounting & Tax Services',
          'Fintech',
        ],
      },
      {
        category_name: 'Retail & E-Commerce',
        subcategories: [
          'Brick-and-Mortar Retail',
          'Online Retail & E-Commerce',
          'Wholesale Distribution',
          'Consumer Goods',
        ],
      },
      {
        category_name: 'Healthcare & Pharmaceuticals',
        subcategories: [
          'Hospitals & Clinics',
          'Medical Equipment Manufacturing',
          'Pharmaceutical Manufacturing',
          'Healthcare Services',
          'Biotechnology',
        ],
      },
      {
        category_name: 'Energy & Utilities',
        subcategories: [
          'Renewable Energy',
          'Solar Power',
          'Wind Energy',
          'Coal and Natural Gas',
          'Water Supply & Sanitation',
        ],
      },
      {
        category_name: 'Education & Training',
        subcategories: [
          'Primary & Secondary Education',
          'Higher Education',
          'Vocational Training',
          'Edtech & Online Learning Platforms',
        ],
      },
      {
        category_name: 'Hospitality & Tourism',
        subcategories: [
          'Hotels & Resorts',
          'Travel & Tourism',
          'Food & Beverages',
          'Event Management',
          'Leisure & Recreation',
        ],
      },
      {
        category_name: 'Media & Entertainment',
        subcategories: [
          'Television & Film Production',
          'Digital Media',
          'Print Media',
          'Music & Performing Arts',
          'Gaming & Animation',
        ],
      },
      {
        category_name: 'Telecommunications',
        subcategories: [
          'Mobile Network Operators',
          'Internet Service Providers (ISPs)',
          'Satellite Communication',
          'Broadband & Wireless Networks',
        ],
      },
      {
        category_name: 'Textiles & Apparel',
        subcategories: [
          'Textile Manufacturing',
          'Garment Production',
          'Fashion Design',
          'Leather Goods Manufacturing',
        ],
      },
      {
        category_name: 'Legal & Consulting Services',
        subcategories: [
          'Legal Advisory & Representation',
          'Management Consulting',
          'Financial Consulting',
          'Market Research',
        ],
      },
      {
        category_name: 'Environmental Services',
        subcategories: [
          'Waste Management',
          'Recycling & Sustainability',
          'Environmental Engineering',
          'Green Technologies',
        ],
      },
      {
        category_name: 'Food & Beverage',
        subcategories: [
          'Restaurants & Cafes',
          'Packaged Food & Beverages',
          'Dairy Products',
          'Food Delivery Services',
        ],
      },
      {
        category_name: 'Consumer Electronics',
        subcategories: [
          'Mobile Phones & Devices',
          'Home Appliances',
          'Audio & Visual Equipment',
        ],
      },
      {
        category_name: 'Pharmaceuticals & Biotechnology',
        subcategories: [
          'Drug Manufacturing',
          'Biotechnology Research',
          'Medical Devices',
          'Health Supplements',
        ],
      },
    ];

    // Add categories and subcategories
    for (const category of categories) {
      // Add the category to the database
      const createdCategory = await tbl_business_category.create({
        category_name: category.category_name,
        created_by: 'Seeder',
        created_datetime: new Date(),
        updated_by: 'Seeder',
        updated_datetime: new Date(),
      });

      // Add the subcategories for this category
      for (const subcategory of category.subcategories) {
        await tbl_business_sub_category.create({
          business_category_id: createdCategory.id,
          sub_category_name: subcategory,
          created_by: 'Seeder',
          created_datetime: new Date(),
          updated_by: 'Seeder',
          updated_datetime: new Date(),
        });
      }
    }
  },

  down: async (queryInterface, Sequelize) => {
    // Remove subcategories and categories in reverse order
    await tbl_business_sub_category.destroy({ where: {} });
    await tbl_business_category.destroy({ where: {} });
  }
};
