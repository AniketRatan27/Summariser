import { prismaConnection } from "./lib/prismaConnection";

async function main() {
   await prismaConnection.product.createMany({
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

   await prismaConnection.review.createMany({
      data: [
         // Product 1 - Headphones
         {
            author: "Amit Sharma",
            rating: 5,
            content:
               "The noise cancellation is excellent and blocks most traffic noise during travel. Sound quality is rich and clear.",
            productId: 1,
         },
         {
            author: "Neha Verma",
            rating: 4,
            content:
               "Very comfortable for long meetings and music sessions. Battery life is also quite good.",
            productId: 1,
         },
         {
            author: "Rohit Iyer",
            rating: 5,
            content:
               "Perfect for flights and daily commute. The ear cushions are soft and the audio feels premium.",
            productId: 1,
         },
         {
            author: "Sneha Kulkarni",
            rating: 4,
            content:
               "Good sound balance and stable Bluetooth connection. The app could have better customization options.",
            productId: 1,
         },
         {
            author: "Karan Mehta",
            rating: 5,
            content:
               "Bass is deep, vocals are clear, and there is no distortion even at high volume.",
            productId: 1,
         },
         {
            author: "Rahul Verma",
            rating: 3,
            content:
               "The headphones are decent overall, but the ear cups become warm after long usage.",
            productId: 1,
         },
         {
            author: "Pooja Iyer",
            rating: 3,
            content:
               "Sound quality is good, but noise cancellation is not equally strong in crowded places.",
            productId: 1,
         },
         {
            author: "Arjun Patel",
            rating: 4,
            content:
               "Fast charging is useful and the build quality feels durable.",
            productId: 1,
         },
         {
            author: "Megha Joshi",
            rating: 2,
            content:
               "Battery drains faster when ANC is enabled continuously. Expected better backup.",
            productId: 1,
         },
         {
            author: "Vikas Rao",
            rating: 1,
            content:
               "Microphone quality is poor during calls and people often complain that my voice is unclear.",
            productId: 1,
         },
         {
            author: "Priya Nair",
            rating: 5,
            content:
               "Excellent comfort, premium design, and immersive audio experience.",
            productId: 1,
         },
         {
            author: "Nitin Khanna",
            rating: 3,
            content:
               "Works fine for music, but the companion app feels limited.",
            productId: 1,
         },
         {
            author: "Ritika Singh",
            rating: 2,
            content:
               "The ear cushion material started peeling after two months of usage.",
            productId: 1,
         },
         {
            author: "Siddharth Desai",
            rating: 5,
            content:
               "Great product for travel and office use. Noise cancellation is the biggest advantage.",
            productId: 1,
         },
         {
            author: "Anjali Kapoor",
            rating: 1,
            content:
               "The Bluetooth connection randomly disconnects, which makes it frustrating during meetings.",
            productId: 1,
         },

         // Product 2 - Fitness Watch
         {
            author: "Priya Singh",
            rating: 4,
            content:
               "The step counter and heart rate tracking feel accurate. Battery lasts almost a full week.",
            productId: 2,
         },
         {
            author: "Arjun Patel",
            rating: 5,
            content:
               "GPS tracking works very well for running and cycling. Syncing data is simple.",
            productId: 2,
         },
         {
            author: "Meenal Joshi",
            rating: 4,
            content:
               "Good features for the price. Sleep tracking and workout modes are useful.",
            productId: 2,
         },
         {
            author: "Vikram Rao",
            rating: 5,
            content:
               "Reliable fitness watch with good water resistance and helpful health metrics.",
            productId: 2,
         },
         {
            author: "Ananya Deshpande",
            rating: 4,
            content:
               "Modern design and comfortable straps. Good option for beginners.",
            productId: 2,
         },
         {
            author: "Rahul Jain",
            rating: 2,
            content: "Step count becomes inaccurate while walking indoors.",
            productId: 2,
         },
         {
            author: "Sneha Verma",
            rating: 3,
            content:
               "The watch works fine, but the mobile app sometimes syncs slowly.",
            productId: 2,
         },
         {
            author: "Riya Kapoor",
            rating: 5,
            content:
               "Lightweight, stylish, and comfortable for daily workouts.",
            productId: 2,
         },
         {
            author: "Vivek Nair",
            rating: 1,
            content: "Charging cable stopped working within one month.",
            productId: 2,
         },
         {
            author: "Pallavi Singh",
            rating: 3,
            content: "Battery backup is decent but not as long as advertised.",
            productId: 2,
         },
         {
            author: "Rohit Iyer",
            rating: 5,
            content:
               "Excellent watch for fitness tracking and daily motivation.",
            productId: 2,
         },
         {
            author: "Ishita Desai",
            rating: 2,
            content: "Touch response becomes laggy after continuous use.",
            productId: 2,
         },
         {
            author: "Saurabh Malhotra",
            rating: 4,
            content: "Water resistance works well during swimming and rain.",
            productId: 2,
         },
         {
            author: "Nikita Joshi",
            rating: 5,
            content: "Very good affordable smartwatch with useful analytics.",
            productId: 2,
         },
         {
            author: "Harsh Arora",
            rating: 1,
            content:
               "The watch restarted automatically several times during workouts.",
            productId: 2,
         },

         // Product 3 - Keyboard
         {
            author: "Siddharth Malhotra",
            rating: 5,
            content:
               "Typing experience is excellent and the tactile switches feel satisfying.",
            productId: 3,
         },
         {
            author: "Pooja Nair",
            rating: 4,
            content:
               "RGB lighting looks beautiful and the aluminum frame feels durable.",
            productId: 3,
         },
         {
            author: "Rahul Khanna",
            rating: 5,
            content:
               "Gaming performance is excellent with responsive key presses.",
            productId: 3,
         },
         {
            author: "Isha Kapoor",
            rating: 3,
            content:
               "Keyboard works well, but the software could be easier to configure.",
            productId: 3,
         },
         {
            author: "Manish Gupta",
            rating: 2,
            content:
               "The keyboard is louder than expected and not ideal for shared spaces.",
            productId: 3,
         },
         {
            author: "Aman Verma",
            rating: 4,
            content: "Key spacing is comfortable and reduces typing fatigue.",
            productId: 3,
         },
         {
            author: "Ritika Sharma",
            rating: 1,
            content: "Some keys started double-typing after only a few weeks.",
            productId: 3,
         },
         {
            author: "Vikas Rao",
            rating: 5,
            content: "Premium build quality and perfect for coding and gaming.",
            productId: 3,
         },
         {
            author: "Neha Singh",
            rating: 4,
            content: "Anti-ghosting works well even during fast games.",
            productId: 3,
         },
         {
            author: "Kunal Joshi",
            rating: 3,
            content:
               "RGB effects are nice, but customization software feels outdated.",
            productId: 3,
         },
         {
            author: "Aditi Kapoor",
            rating: 5,
            content: "Switches are consistent and typing feels smooth.",
            productId: 3,
         },
         {
            author: "Rohit Patel",
            rating: 2,
            content: "A wrist rest should have been included at this price.",
            productId: 3,
         },
         {
            author: "Ankit Desai",
            rating: 4,
            content: "Cable quality is strong and the keyboard feels sturdy.",
            productId: 3,
         },
         {
            author: "Sneha Kulkarni",
            rating: 5,
            content:
               "Great keyboard for gamers who want speed and RGB aesthetics.",
            productId: 3,
         },
         {
            author: "Deepak Nair",
            rating: 1,
            content:
               "Customer support was not helpful when I faced switch issues.",
            productId: 3,
         },

         // Product 4 - Coffee Machine
         {
            author: "Rakesh Bansal",
            rating: 5,
            content: "Produces rich espresso with excellent crema and aroma.",
            productId: 4,
         },
         {
            author: "Nidhi Agarwal",
            rating: 4,
            content:
               "Compact design and easy cleaning make it suitable for home use.",
            productId: 4,
         },
         {
            author: "Saurabh Jain",
            rating: 5,
            content: "Pressure system extracts coffee flavor very well.",
            productId: 4,
         },
         {
            author: "Kavita Mishra",
            rating: 3,
            content:
               "Coffee quality is good, but the milk frother takes practice.",
            productId: 4,
         },
         {
            author: "Deepak Choudhary",
            rating: 2,
            content:
               "Water tank capacity is small and needs frequent refilling.",
            productId: 4,
         },
         {
            author: "Priya Sharma",
            rating: 4,
            content: "Machine heats quickly and saves time in the morning.",
            productId: 4,
         },
         {
            author: "Ankit Verma",
            rating: 1,
            content: "The steam wand stopped working after one month.",
            productId: 4,
         },
         {
            author: "Megha Kapoor",
            rating: 5,
            content: "Perfect for home espresso with café-style output.",
            productId: 4,
         },
         {
            author: "Rahul Nair",
            rating: 4,
            content:
               "Build quality feels premium and operation is beginner-friendly.",
            productId: 4,
         },
         {
            author: "Ishita Rao",
            rating: 3,
            content: "Makes good coffee but can be noisy during operation.",
            productId: 4,
         },
         {
            author: "Vivek Malhotra",
            rating: 5,
            content:
               "Consistent temperature control and excellent flavor extraction.",
            productId: 4,
         },
         {
            author: "Neha Patel",
            rating: 2,
            content: "Cleaning internal parts is more difficult than expected.",
            productId: 4,
         },
         {
            author: "Aman Khanna",
            rating: 4,
            content: "Milk frother creates smooth foam for cappuccinos.",
            productId: 4,
         },
         {
            author: "Ritika Desai",
            rating: 5,
            content: "Reliable machine for daily coffee lovers.",
            productId: 4,
         },
         {
            author: "Karan Joshi",
            rating: 1,
            content: "Coffee started tasting burnt after a few weeks.",
            productId: 4,
         },

         // Product 5 - Office Chair
         {
            author: "Alok Srivastava",
            rating: 5,
            content: "Lumbar support is excellent and improved my posture.",
            productId: 5,
         },
         {
            author: "Shweta Kulkarni",
            rating: 4,
            content:
               "Comfortable chair for long working hours with breathable mesh.",
            productId: 5,
         },
         {
            author: "Nitin Arora",
            rating: 5,
            content: "Assembly was simple and build quality feels sturdy.",
            productId: 5,
         },
         {
            author: "Pallavi Desai",
            rating: 3,
            content: "Good chair overall, but armrests could be softer.",
            productId: 5,
         },
         {
            author: "Sandeep Kulkarni",
            rating: 2,
            content: "Reclining mechanism feels loose after continuous use.",
            productId: 5,
         },
         {
            author: "Rohit Sharma",
            rating: 4,
            content: "Looks professional and fits well in my office setup.",
            productId: 5,
         },
         {
            author: "Aditi Verma",
            rating: 1,
            content:
               "Hydraulic height adjustment stopped working after two months.",
            productId: 5,
         },
         {
            author: "Vikas Mehta",
            rating: 5,
            content: "Very comfortable for coding and office work.",
            productId: 5,
         },
         {
            author: "Neha Iyer",
            rating: 4,
            content: "Breathable mesh keeps me cool during long work sessions.",
            productId: 5,
         },
         {
            author: "Rahul Kapoor",
            rating: 3,
            content: "Good chair overall but cushioning could be thicker.",
            productId: 5,
         },
         {
            author: "Priya Nair",
            rating: 5,
            content: "Excellent ergonomics and adjustable support.",
            productId: 5,
         },
         {
            author: "Kunal Patel",
            rating: 2,
            content: "Wheel movement became rough after a few weeks.",
            productId: 5,
         },
         {
            author: "Anjali Rao",
            rating: 4,
            content: "Easy to adjust and provides good lower back support.",
            productId: 5,
         },
         {
            author: "Siddharth Jain",
            rating: 5,
            content: "One of the best chairs I have used for productivity.",
            productId: 5,
         },
         {
            author: "Harsh Desai",
            rating: 1,
            content: "Customer support was poor when I reported base issues.",
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
      await prismaConnection.$disconnect();
   });
