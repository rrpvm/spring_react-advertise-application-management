insert into banners ( is_deleted, banner_name, banner_price, banner_text) values (false, 'some_banner',9.99,'lorem ipsum dolar sit');
insert into banners ( is_deleted, banner_name, banner_price, banner_text) values (false, 'second_banner',19.99,'2lorem ipsum dolar sit');
insert into categories ( name, request_id) values ('some category', 'some request');
insert into categories ( name, request_id) values ('second category', 'second request');
insert into banners_categories (banner_id, categories_id) VALUES (1,1);
insert into banners_categories (banner_id, categories_id) VALUES (2,1);
insert into banners_categories (banner_id, categories_id) VALUES (2,2);