# server

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run index.ts
```

This project was created using `bun init` in bun v1.2.22. [Bun](https://bun.com) is a fast all-in-one JavaScript runtime.

#To play around with the backend and to understand it
i would recommend to populate the database and its table to experience the backend
operation with upcomming database tests

INSERT INTO products (id, name, description, price) VALUES
(1, 'Wireless Noise Cancelling Headphones', 'Over-ear wireless headphones with active noise cancellation and long battery life.', 149.99),
(2, 'Smart Fitness Watch', 'Water-resistant fitness watch with heart rate monitoring and GPS.', 99.50),
(3, 'Mechanical Gaming Keyboard', 'RGB mechanical keyboard with tactile switches and aluminum body.', 129.00),
(4, 'Espresso Coffee Machine', 'Compact espresso machine for home use with milk frother.', 189.75),
(5, 'Ergonomic Office Chair', 'Adjustable ergonomic chair with lumbar support and breathable mesh.', 219.99);

INSERT INTO reviews (author, rating, content, productId) VALUES
('Amit Sharma', 5, 'These headphones completely changed how I experience music and calls. The noise cancellation is extremely effective during my daily commute, blocking out traffic and chatter with ease. The sound quality is rich, with deep bass and clear mids, and the battery easily lasts me several days of regular use.', 1),
('Neha Verma', 4, 'I use these headphones mostly for work calls and online meetings, and they perform very well. The microphone is clear and the comfort level is high even after wearing them for hours. Noise cancellation is great, though at maximum level it slightly affects battery life.', 1),
('Rohit Iyer', 5, 'As someone who travels frequently, these headphones are a blessing. Airplane noise is almost completely eliminated, and I can enjoy movies without increasing the volume too much. Build quality feels premium and the ear cushions are very soft.', 1),
('Sneha Kulkarni', 4, 'The sound profile is well-balanced and perfect for both music and podcasts. Pairing with my phone was instant and stable. I wish the companion app had more customization options, but overall I am very satisfied with the purchase.', 1),
('Karan Mehta', 5, 'I have tried several noise cancelling headphones before, but this one stands out for its comfort and clarity. Even at high volumes, there is no distortion. It is definitely worth the price for anyone who values immersive audio.', 1),

('Priya Singh', 4, 'This fitness watch has motivated me to stay active every day. The step counter and heart rate monitoring feel accurate, and the battery lasts almost a full week. The display is bright and easy to read even in sunlight.', 2),
('Arjun Patel', 5, 'I bought this watch mainly for running, and the built-in GPS works flawlessly. It tracks distance and pace very accurately, and syncing data to my phone is seamless. The watch is lightweight and comfortable during long workouts.', 2),
('Meenal Joshi', 4, 'The watch offers a lot of features for its price, including sleep tracking and workout modes. I really like the clean interface. Sometimes the app takes a bit longer to sync, but it is not a deal breaker.', 2),
('Vikram Rao', 5, 'I have been using this fitness watch daily for three months, and it has been reliable throughout. The heart rate trends help me understand my fitness better, and the water resistance is great for swimming sessions.', 2),
('Ananya Deshpande', 4, 'Overall, this is a solid fitness watch for beginners and intermediate users. The design looks modern and the straps are comfortable. I wish it had more advanced analytics, but for the price, it performs very well.', 2),

('Siddharth Malhotra', 5, 'This mechanical keyboard feels amazing to type on. The tactile switches provide excellent feedback, making long coding sessions enjoyable. The RGB lighting is vibrant and customizable, adding a great aesthetic to my desk.', 3),
('Pooja Nair', 4, 'I use this keyboard for both work and gaming, and it performs well in both scenarios. The keys are responsive and sturdy. It is slightly loud, which is expected from mechanical switches, but it might not suit shared spaces.', 3),
('Rahul Khanna', 5, 'The build quality of this keyboard is top-notch, with a solid metal frame that feels durable. Gaming performance is excellent, and the anti-ghosting ensures every key press is registered accurately during intense sessions.', 3),
('Isha Kapoor', 4, 'Typing on this keyboard is very satisfying and fast. The key spacing is comfortable and reduces fatigue. The RGB software could be more user-friendly, but once set up, it works perfectly.', 3),
('Manish Gupta', 5, 'As a gamer, I love the precision and responsiveness of this keyboard. The switches are consistent across all keys, and the overall design looks premium. Definitely a great investment for serious users.', 3),

('Rakesh Bansal', 5, 'This espresso machine has brought café-quality coffee into my home. It heats up quickly and produces rich, aromatic espresso with a beautiful crema. The milk frother works well for cappuccinos and lattes.', 4),
('Nidhi Agarwal', 4, 'I am new to making espresso at home, and this machine is quite beginner-friendly. After a few tries, I was able to make great-tasting coffee. Cleaning is easy, though the water tank could be slightly larger.', 4),
('Saurabh Jain', 5, 'The compact design fits perfectly in my kitchen without taking too much space. Performance is impressive, and the pressure system extracts excellent flavor from the coffee grounds every time.', 4),
('Kavita Mishra', 4, 'I enjoy experimenting with different coffee beans, and this machine handles them well. The espresso tastes consistent and smooth. The steam wand takes some practice, but it delivers good foam.', 4),
('Deepak Choudhary', 5, 'After using this espresso machine daily for two months, I can confidently say it is worth the money. It is reliable, easy to operate, and makes delicious coffee that rivals expensive cafés.', 4),

('Alok Srivastava', 5, 'This ergonomic chair has significantly improved my comfort during long work hours. The lumbar support is excellent and helps maintain good posture. The mesh back keeps me cool even in warm weather.', 5),
('Shweta Kulkarni', 4, 'I work from home and sit for long periods, and this chair has reduced my back pain noticeably. The adjustments are easy to use, though I wish the armrests had a bit more padding.', 5),
('Nitin Arora', 5, 'The chair feels sturdy and well-built. Assembly was straightforward, and once set up, it provided great support for my lower back. It is a great choice for anyone with a desk job.', 5),
('Pallavi Desai', 4, 'I like the breathable material and overall design of this chair. It looks professional and fits well in my home office. The reclining feature is smooth and relaxing during short breaks.', 5),
('Sandeep Kulkarni', 5, 'After trying multiple office chairs, this one stands out in terms of comfort and adjustability. I can sit for hours without feeling strain. Highly recommended for productivity and health.', 5);

#kindly format this and use it in your SQL workbench
