-- ============================================
-- HanaVeg — Seed Data
-- Phase 3.1: Mock data cho menu + restaurant tables
-- ============================================

-- ============================================
-- Menu Categories (4 danh mục)
-- ============================================
INSERT INTO menu_categories (id, name, name_en, name_zh, sort_order) VALUES
  ('a1000000-0000-0000-0000-000000000001', 'Khai vị', 'Appetizer', '开胃菜', 1),
  ('a1000000-0000-0000-0000-000000000002', 'Món chính', 'Main Course', '主菜', 2),
  ('a1000000-0000-0000-0000-000000000003', 'Canh & Lẩu', 'Soup & Hotpot', '汤 & 火锅', 3),
  ('a1000000-0000-0000-0000-000000000004', 'Nước uống', 'Beverages', '饮品', 4);

-- ============================================
-- Menu Items (16 món — 4 mỗi danh mục)
-- ============================================

-- Khai vị
INSERT INTO menu_items (name, name_en, name_zh, description, description_en, description_zh, price, category_id, is_available, sort_order) VALUES
  ('Gỏi cuốn chay', 'Vegetarian Spring Rolls', '素春卷',
   'Cuốn tươi rau xanh, bún, đậu hũ, chấm tương đậu phộng', 'Fresh rolls with greens, vermicelli, tofu, peanut sauce', '新鲜蔬菜卷配花生酱',
   75000, 'a1000000-0000-0000-0000-000000000001', TRUE, 1),

  ('Chả giò nấm', 'Mushroom Fried Rolls', '蘑菇炸春卷',
   'Chả giò giòn rụm nhân nấm đông cô, mộc nhĩ, miến', 'Crispy rolls with shiitake mushrooms, wood ear, glass noodles', '香酥蘑菇春卷',
   65000, 'a1000000-0000-0000-0000-000000000001', TRUE, 2),

  ('Salad đậu hũ nướng', 'Grilled Tofu Salad', '烤豆腐沙拉',
   'Đậu hũ nướng mè, rau mầm, sốt mè rang Nhật', 'Sesame grilled tofu, sprouts, Japanese sesame dressing', '芝麻烤豆腐配日式酱',
   95000, 'a1000000-0000-0000-0000-000000000001', TRUE, 3),

  ('Đậu hũ chiên giòn sốt me', 'Crispy Tofu with Tamarind', '罗望子酥豆腐',
   'Đậu hũ chiên vàng giòn, sốt me chua ngọt, rau thơm', 'Golden fried tofu with sweet tamarind sauce, herbs', '酥炸豆腐配罗望子酸甜酱',
   70000, 'a1000000-0000-0000-0000-000000000001', TRUE, 4);

-- Món chính
INSERT INTO menu_items (name, name_en, name_zh, description, description_en, description_zh, price, category_id, is_available, sort_order) VALUES
  ('Nấm Truffle Hảo Hạng', 'Premium Truffle Mushrooms', '松露蘑菇',
   'Nấm hỗn hợp xào dầu truffle, rau củ theo mùa', 'Mixed mushrooms sautéed with truffle oil, seasonal vegetables', '松露油炒混合蘑菇配时令蔬菜',
   195000, 'a1000000-0000-0000-0000-000000000002', TRUE, 1),

  ('Đậu Hũ Miso Nhật', 'Japanese Miso Tofu', '日式味噌豆腐',
   'Đậu hũ non nấu miso trắng, rong biển, hành lá', 'Silken tofu in white miso broth, seaweed, scallions', '白味噌嫩豆腐配海藻',
   120000, 'a1000000-0000-0000-0000-000000000002', TRUE, 2),

  ('Cà Ri Rau Củ Vàng', 'Golden Vegetable Curry', '金色蔬菜咖喱',
   'Cà ri nghệ vàng với khoai lang, đậu gà, nước cốt dừa', 'Golden turmeric curry with sweet potato, chickpeas, coconut milk', '姜黄咖喱配红薯鸡豆椰奶',
   110000, 'a1000000-0000-0000-0000-000000000002', TRUE, 3),

  ('Cơm chiên rau thập cẩm', 'Mixed Vegetable Fried Rice', '什锦蔬菜炒饭',
   'Cơm chiên tỏi với rau củ tươi, nấm, đậu hũ', 'Garlic fried rice with fresh vegetables, mushrooms, tofu', '蒜香炒饭配新鲜蔬菜蘑菇豆腐',
   95000, 'a1000000-0000-0000-0000-000000000002', FALSE, 4);

-- Canh & Lẩu
INSERT INTO menu_items (name, name_en, name_zh, description, description_en, description_zh, price, category_id, is_available, sort_order) VALUES
  ('Canh nấm hầm sả', 'Lemongrass Mushroom Soup', '香茅蘑菇汤',
   'Nấm tươi hầm sả, gừng, lá chanh, nước dùng trong', 'Fresh mushrooms simmered with lemongrass, ginger, kaffir lime', '香茅姜柠檬叶蘑菇清汤',
   75000, 'a1000000-0000-0000-0000-000000000003', TRUE, 1),

  ('Súp bí đỏ kem', 'Creamy Pumpkin Soup', '奶油南瓜汤',
   'Bí đỏ nấu kem mịn, hạt bí rang, ớt bột nhẹ', 'Smooth pumpkin cream soup, roasted seeds, light chili', '丝滑南瓜浓汤配烤南瓜籽',
   65000, 'a1000000-0000-0000-0000-000000000003', TRUE, 2),

  ('Lẩu nấm tổng hợp', 'Mixed Mushroom Hotpot', '什锦蘑菇火锅',
   'Lẩu nấm 5 loại, rau xanh, đậu hũ, bún tươi (2 người)', 'Hotpot with 5 mushroom varieties, greens, tofu, noodles (2 pax)', '五种蘑菇火锅配蔬菜豆腐米粉（2人份）',
   250000, 'a1000000-0000-0000-0000-000000000003', TRUE, 3),

  ('Canh chua chay', 'Vegetarian Sour Soup', '素酸汤',
   'Canh chua dứa, cà chua, đậu bắp, giá đỗ, rau om', 'Pineapple sour soup with tomato, okra, bean sprouts', '菠萝酸汤配番茄秋葵豆芽',
   70000, 'a1000000-0000-0000-0000-000000000003', TRUE, 4);

-- Nước uống
INSERT INTO menu_items (name, name_en, name_zh, description, description_en, description_zh, price, category_id, is_available, sort_order) VALUES
  ('Trà Sen An Nhiên', 'An Nhien Lotus Tea', '安然莲花茶',
   'Trà sen thơm nhẹ, hương thanh khiết, phục vụ ấm nhỏ', 'Delicate lotus tea, pure fragrance, served in small pot', '清香莲花茶，小壶奉上',
   45000, 'a1000000-0000-0000-0000-000000000004', TRUE, 1),

  ('Nước ép rau má', 'Pennywort Juice', '积雪草汁',
   'Rau má tươi xay mát lạnh, thanh nhiệt giải độc', 'Fresh chilled pennywort juice, cooling and detoxifying', '新鲜清凉积雪草汁，清热解毒',
   35000, 'a1000000-0000-0000-0000-000000000004', TRUE, 2),

  ('Sinh tố bơ', 'Avocado Smoothie', '牛油果奶昔',
   'Bơ sáp Đắk Lắk xay kem, béo ngậy tự nhiên', 'Creamy Dak Lak avocado smoothie, naturally rich', '达乐省牛油果奶昔，天然醇厚',
   55000, 'a1000000-0000-0000-0000-000000000004', TRUE, 3),

  ('Nước chanh dây mật ong', 'Passion Fruit Honey', '百香果蜂蜜水',
   'Chanh dây tươi, mật ong nguyên chất, đá viên', 'Fresh passion fruit with pure honey, on ice', '新鲜百香果配纯蜂蜜，加冰',
   40000, 'a1000000-0000-0000-0000-000000000004', TRUE, 4);

-- ============================================
-- Restaurant Tables (8 bàn)
-- ============================================
INSERT INTO restaurant_tables (name, capacity, location, status, is_active, sort_order) VALUES
  ('Bàn 1', 2, 'Tầng 1', 'available', TRUE, 1),
  ('Bàn 2', 2, 'Tầng 1', 'available', TRUE, 2),
  ('Bàn 3', 4, 'Tầng 1', 'available', TRUE, 3),
  ('Bàn 4', 4, 'Tầng 1', 'available', TRUE, 4),
  ('Bàn 5', 6, 'Sân vườn', 'available', TRUE, 5),
  ('Bàn 6', 6, 'Sân vườn', 'available', TRUE, 6),
  ('Bàn VIP 1', 8, 'Phòng riêng', 'available', TRUE, 7),
  ('Bàn VIP 2', 12, 'Phòng riêng', 'available', TRUE, 8);

-- ============================================
-- Site Settings (cấu hình mặc định)
-- ============================================
INSERT INTO site_settings (key, value) VALUES
  ('restaurant_info', '{
    "name": "Hana Veg",
    "phone": "0909 123 456",
    "email": "info@hanaveg.com",
    "address": "123 Đường An Nhiên, Quận 1, TP.HCM",
    "opening_hours": {
      "weekday": "10:00 - 21:00",
      "weekend": "09:00 - 22:00"
    }
  }'::JSONB);
