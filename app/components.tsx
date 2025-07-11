'use client'
import { useEffect, useState } from "react";
import Image from 'next/image';
import Link from 'next/link';
import Script from 'next/script';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '/images/sample-logo.png'




function Navigation(){
	const [open, setOpen] = useState(true);

	const handleOpen = ()=> {
		setOpen(!open);
	}

	return(
		<>
			<motion.button whileTap={{ rotate: 360 }} transition={{ rotate: {duration: 0.4} }} onClick={handleOpen} className="w-fit fixed top-2 right-2 z-3 text-xl rounded-xl" ><Image src="/images/menu.png" width={50} height={50} alt="menu-mushroom" /></motion.button>
			<AnimatePresence>
				{open && (<motion.div 
					className="w-full h-15 md:p-4 p-6 bg-[#4d4b4b] fixed top-0 left-0 z-2"
					key="navigation"
					initial={{ opacity: 0, y: "-100%" }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: "-100%" }}
					transition={{
						opacity: { duration: 0.4 },
						y: { duration: 0.4 },
					}}>
						<ul className="w-full p-2 flex items-start">
							<li className="text-[#efe5e3] hover:underline mx-1 md:mx-5"><Link href="#home">HOME</Link></li>
							<li className="text-[#efe5e3] hover:underline mx-1 md:mx-5"><Link href="#about">ABOUT</Link></li>
							<li className="text-[#efe5e3] hover:underline  mx-1 md:mx-5"><Link href="#contact">CONTACT</Link></li>
							<li className="text-[#efe5e3] hover:underline mx-1 md:mx-5"><Link href="#reviews">REVIEWS</Link></li>
						</ul>
					</motion.div>)}
			</AnimatePresence>
		</>
	);
}

function About(){
	return(
		<div id="about" className="w-full my-10">

			<div className="w-full h-dvh sm:grid sm:grid-cols-6 gap-4">
				<div className="sm:bg-[url(/images/about-side.gif)] bg-center bg-cover"></div>
				<div className="col-span-4">
					<motion.h1
						className="w-full text-center text-4xl md:text-6xl font-bold text-[#d14b4b] font-bold py-20"
						initial={{ y: "100%", opacity: 0 }}
          				whileInView={{ y: 0, opacity: 1 }}
          				transition={{ duration: 0.4, ease: 'easeInOut'}}
          				viewport={{ once: true }}>

          				ABOUT

					</motion.h1>
					<motion.p 
						className="w-full sm:w-3/4 p-1 m-auto"
						initial={{ y: "100%", opacity: 0 }}
          				whileInView={{ y: 0, opacity: 1 }}
          				transition={{ duration: 0.4, ease: 'easeInOut'}}
          				viewport={{ once: true }}>
						Hi there — and welcome to Retro Buy & Sell, your local hub for all things classic, nostalgic, and just plain awesome.

We’re a small business with a big passion for retro games, vintage consoles, and the golden age of pop culture. Whether you’re dusting off your childhood favorites or just discovering the magic of the NES, Game Boy, or Sega Genesis, we’re here to help you find (or relive) the joy of old-school gaming.

Located right here in [Your City/Area], we’ve spent years building a space where collectors, players, and fans can come together — online and in person — to buy, sell, and trade the treasures of decades past. From rare cartridges and controllers to posters, toys, and more, we’re proud to offer a growing inventory that’s as fun to browse as it is to collect.

We believe in fair pricing, honest trade-ins, and real connections. When you reach out to us, you're not talking to a robot — you're talking to someone who probably spent way too many hours trying to beat Contra without the cheat code.

Why choose Retro Buy & Sell?

We're local and proud of it — no big corporate nonsense here

We inspect every item by hand for quality and authenticity

We offer trade-ins and cash deals for your retro gear

We love helping you find that one game you thought was lost forever

At the end of the day, we’re not just a store — we’re part of a community that keeps the classics alive. Whether you're buying your first GameCube or finally tracking down that copy of EarthBound, we’re here for the journey.

Thanks for stopping by.
					</motion.p>
				</div>
				<div className="sm:bg-[url(/images/about-side.gif)] bg-center bg-cover"></div>
			</div>
		
	</div>
	);
}

function Reviews(){

	type Review = {
  	name: string;
  	rating: number;
  	text: string;
	};


  const [reviews, setReviews] = useState<Review[]>([]);


  useEffect(() => {
    async function loadReviews() {
      const res = await fetch("/api/reviews");
      const data = await res.json();
      console.log("Loaded reviews:", data); // Check the browser console
      setReviews(data);
    }

    loadReviews();
  }, []);

	return(
		<section id="reviews" className="w-full py-12">
      <motion.h1
        className="text-center text-4xl md:text-6xl font-bold text-[#d14b4b] mb-10 pt-20"
        initial={{ y: "100%", opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        viewport={{ once: true }}
      >
        REVIEWS
      </motion.h1>

      <div className="grid gap-6 max-w-4xl max-h-60 mx-auto px-4 overflow-y-scroll">
        {reviews.map((review, idx) => (
          <motion.div
            key={idx}
            className="bg-[#d14b4b] rounded-xl p-6 shadow-md"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: idx * 0.1 }}
            viewport={{ once: true }}
          >
            <div className="flex gap-2 mb-2">
              <span className="font-semibold text-[#4d4b4b]">{review.name}</span>
              <span className="text-yellow-500">
                {"★".repeat(review.rating)}{" "}
                {"☆".repeat(5 - review.rating)}
              </span>
            </div>
            <p className="text-sm">{review.text}</p>
          </motion.div>
        ))}
      </div>

      <p className="text-xl text-center py-5">Would you like to leave a <Link href="https://docs.google.com/forms/d/e/1FAIpQLSewWKyEbgSNwmg5Uf6W_ypkAL0TjjwSzm4jigAISdlABMh01w/viewform?usp=header" target="_blank" className="font-bold underline">Review</Link>?</p>
    </section>
	);
}

function Contact(){
	return(
		<div id="contact" className="w-full min-h-dvh">
			<motion.h1 
				className="w-full text-4xl md:text-6xl text-center text-[#d14b4b] pt-20 font-bold"
				initial={{ y: "100%", opacity: 0 }}
          		whileInView={{ y: 0, opacity: 1 }}
          		transition={{ duration: 0.4, ease: 'easeInOut'}}
          		viewport={{ once: true }}
			>

				CONTACT

			</motion.h1>
			<motion.form
				className="w-3/4 md:w-1/2 bg-[#d14b4b] mx-auto my-10 rounded-xl p-5"
				initial={{ y: "100%", opacity: 0 }}
          		whileInView={{ y: 0, opacity: 1 }}
          		transition={{ duration: 0.4, ease: 'easeInOut'}}
          		viewport={{ once: true }}>

          		<h1 className="w-full text-center text-2xl">Please Reach out!</h1>

          		<input type="text" required placeholder="Name" className="block w-3/4 bg-[#efe5e3] mx-auto my-5 p-2 rounded-xl text-[#4d4b4b]" />
          		<input type="number" required placeholder="Phone Number" className="block w-3/4 bg-[#efe5e3] mx-auto my-5 p-2 rounded-xl text-[#4d4b4b]" />
          		<input type="email" required placeholder="Email" className="block w-3/4 bg-[#efe5e3] mx-auto my-5 p-2 rounded-xl text-[#4d4b4b]" />
          		<textarea rows={4} type="text" required placeholder="Message..." className="block w-3/4 bg-[#efe5e3] mx-auto my-5 p-2 rounded-xl text-[#4d4b4b]" />


			</motion.form>
		</div>

	);
}

function Footer() {
  return (
    <footer className="w-full bg-black text-white py-6 text-center mt-12">
      <p className="text-sm">Website designed and created by <Link href="https://judahchristman.com" target="_blank">Judah Christman</Link></p>
      <p className="text-sm">Retro Buy & Sell 2025</p>
    </footer>
  );
}

export { Navigation, About, Reviews, Contact, Footer };