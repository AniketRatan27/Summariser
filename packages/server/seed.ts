import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "./generated/prisma";

// SAME adapter pattern as your repositories
const adapter = new PrismaMariaDb({
   host: process.env.DATABASE_HOST,
   user: process.env.DATABASE_USER,
   password: process.env.DATABASE_PASSWORD,
   database: process.env.DATABASE_NAME,
});

const prisma = new PrismaClient({ adapter });

async function main() {
   // -------------------
   // PRODUCTS (WITH IDs)
   // -------------------
   await prisma.product.createMany({
      data: [
         {
            id: 1,
            name: "Wireless Noise Cancelling Headphones",
            description:
               "Over-ear wireless headphones with active noise cancellation and long battery life.",
            price: 149.99,
         },
         {
            id: 2,
            name: "Smart Fitness Watch",
            description:
               "Water-resistant fitness watch with heart rate monitoring and GPS.",
            price: 99.5,
         },
         {
            id: 3,
            name: "Mechanical Gaming Keyboard",
            description:
               "RGB mechanical keyboard with tactile switches and aluminum body.",
            price: 129.0,
         },
         {
            id: 4,
            name: "Espresso Coffee Machine",
            description:
               "Compact espresso machine for home use with milk frother.",
            price: 189.75,
         },
         {
            id: 5,
            name: "Ergonomic Office Chair",
            description:
               "Adjustable ergonomic chair with lumbar support and breathable mesh.",
            price: 219.99,
         },
      ],
   });

   // -------------------
   // REVIEWS
   // -------------------
   await prisma.review.createMany({
      data: [
         // Product 1
         {
            author: "Amit Sharma",
            rating: 5,
            content:
               "These headphones completely changed how I experience music and calls. The noise cancellation is extremely effective during my daily commute, blocking out traffic and chatter with ease. The sound quality is rich, with deep bass and clear mids, and the battery easily lasts me several days of regular use.",
            productId: 1,
         },
         {
            author: "Neha Verma",
            rating: 4,
            content:
               "I use these headphones mostly for work calls and online meetings, and they perform very well. The microphone is clear and the comfort level is high even after wearing them for hours. Noise cancellation is great, though at maximum level it slightly affects battery life.",
            productId: 1,
         },
         {
            author: "Rohit Iyer",
            rating: 5,
            content:
               "As someone who travels frequently, these headphones are a blessing. Airplane noise is almost completely eliminated, and I can enjoy movies without increasing the volume too much. Build quality feels premium and the ear cushions are very soft.",
            productId: 1,
         },
         {
            author: "Sneha Kulkarni",
            rating: 4,
            content:
               "The sound profile is well-balanced and perfect for both music and podcasts. Pairing with my phone was instant and stable. I wish the companion app had more customization options, but overall I am very satisfied with the purchase.",
            productId: 1,
         },
         {
            author: "Karan Mehta",
            rating: 5,
            content:
               "I have tried several noise cancelling headphones before, but this one stands out for its comfort and clarity. Even at high volumes, there is no distortion. It is definitely worth the price for anyone who values immersive audio.",
            productId: 1,
         },

         // Product 2
         {
            author: "Priya Singh",
            rating: 4,
            content:
               "This fitness watch has motivated me to stay active every day. The step counter and heart rate monitoring feel accurate, and the battery lasts almost a full week. The display is bright and easy to read even in sunlight.",
            productId: 2,
         },
         {
            author: "Arjun Patel",
            rating: 5,
            content:
               "I bought this watch mainly for running, and the built-in GPS works flawlessly. It tracks distance and pace very accurately, and syncing data to my phone is seamless. The watch is lightweight and comfortable during long workouts.",
            productId: 2,
         },
         {
            author: "Meenal Joshi",
            rating: 4,
            content:
               "The watch offers a lot of features for its price, including sleep tracking and workout modes. I really like the clean interface. Sometimes the app takes a bit longer to sync, but it is not a deal breaker.",
            productId: 2,
         },
         {
            author: "Vikram Rao",
            rating: 5,
            content:
               "I have been using this fitness watch daily for three months, and it has been reliable throughout. The heart rate trends help me understand my fitness better, and the water resistance is great for swimming sessions.",
            productId: 2,
         },
         {
            author: "Ananya Deshpande",
            rating: 4,
            content:
               "Overall, this is a solid fitness watch for beginners and intermediate users. The design looks modern and the straps are comfortable. I wish it had more advanced analytics, but for the price, it performs very well.",
            productId: 2,
         },

         // Product 3
         {
            author: "Siddharth Malhotra",
            rating: 5,
            content:
               "This mechanical keyboard feels amazing to type on. The tactile switches provide excellent feedback, making long coding sessions enjoyable. The RGB lighting is vibrant and customizable, adding a great aesthetic to my desk.",
            productId: 3,
         },
         {
            author: "Pooja Nair",
            rating: 4,
            content:
               "I use this keyboard for both work and gaming, and it performs well in both scenarios. The keys are responsive and sturdy. It is slightly loud, which is expected from mechanical switches, but it might not suit shared spaces.",
            productId: 3,
         },
         {
            author: "Rahul Khanna",
            rating: 5,
            content:
               "The build quality of this keyboard is top-notch, with a solid metal frame that feels durable. Gaming performance is excellent, and the anti-ghosting ensures every key press is registered accurately during intense sessions.",
            productId: 3,
         },
         {
            author: "Isha Kapoor",
            rating: 4,
            content:
               "Typing on this keyboard is very satisfying and fast. The key spacing is comfortable and reduces fatigue. The RGB software could be more user-friendly, but once set up, it works perfectly.",
            productId: 3,
         },
         {
            author: "Manish Gupta",
            rating: 5,
            content:
               "As a gamer, I love the precision and responsiveness of this keyboard. The switches are consistent across all keys, and the overall design looks premium. Definitely a great investment for serious users.",
            productId: 3,
         },

         // Product 4
         {
            author: "Rakesh Bansal",
            rating: 5,
            content:
               "This espresso machine has brought café-quality coffee into my home. It heats up quickly and produces rich, aromatic espresso with a beautiful crema. The milk frother works well for cappuccinos and lattes.",
            productId: 4,
         },
         {
            author: "Nidhi Agarwal",
            rating: 4,
            content:
               "I am new to making espresso at home, and this machine is quite beginner-friendly. After a few tries, I was able to make great-tasting coffee. Cleaning is easy, though the water tank could be slightly larger.",
            productId: 4,
         },
         {
            author: "Saurabh Jain",
            rating: 5,
            content:
               "The compact design fits perfectly in my kitchen without taking too much space. Performance is impressive, and the pressure system extracts excellent flavor from the coffee grounds every time.",
            productId: 4,
         },
         {
            author: "Kavita Mishra",
            rating: 4,
            content:
               "I enjoy experimenting with different coffee beans, and this machine handles them well. The espresso tastes consistent and smooth. The steam wand takes some practice, but it delivers good foam.",
            productId: 4,
         },
         {
            author: "Deepak Choudhary",
            rating: 5,
            content:
               "After using this espresso machine daily for two months, I can confidently say it is worth the money. It is reliable, easy to operate, and makes delicious coffee that rivals expensive cafés.",
            productId: 4,
         },

         // Product 5
         {
            author: "Alok Srivastava",
            rating: 5,
            content:
               "This ergonomic chair has significantly improved my comfort during long work hours. The lumbar support is excellent and helps maintain good posture. The mesh back keeps me cool even in warm weather.",
            productId: 5,
         },
         {
            author: "Shweta Kulkarni",
            rating: 4,
            content:
               "I work from home and sit for long periods, and this chair has reduced my back pain noticeably. The adjustments are easy to use, though I wish the armrests had a bit more padding.",
            productId: 5,
         },
         {
            author: "Nitin Arora",
            rating: 5,
            content:
               "The chair feels sturdy and well-built. Assembly was straightforward, and once set up, it provided great support for my lower back. It is a great choice for anyone with a desk job.",
            productId: 5,
         },
         {
            author: "Pallavi Desai",
            rating: 4,
            content:
               "I like the breathable material and overall design of this chair. It looks professional and fits well in my home office. The reclining feature is smooth and relaxing during short breaks.",
            productId: 5,
         },
         {
            author: "Sandeep Kulkarni",
            rating: 5,
            content:
               "After trying multiple office chairs, this one stands out in terms of comfort and adjustability. I can sit for hours without feeling strain. Highly recommended for productivity and health.",
            productId: 5,
         },
      ],
   });

   console.log("✅ Seed completed successfully");
}

main()
   .catch((err) => {
      console.error("❌ Seed failed:", err);
      process.exit(1);
   })
   .finally(async () => {
      await prisma.$disconnect();
   });
