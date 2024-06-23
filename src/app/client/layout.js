import Button from '@/components/Button'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import Copyright from '@/svg/Copyright'
import Link from 'next/link'

export default function RootLayout({ children }) {
  return (
    <div>
      <div className="h-16 flex place-content-center tracking-wider font-bold px-4 lg:px-20">
        <div className="flex place-items-center text-primary-dark ">
          <Link href="tel:+919460522700">
            <div className="mr-8 hover:text-black hover:dark:text-primary-base cursor-pointer">
              +91 94605 22700
            </div>
          </Link>
          <Link href="mailto:saisevasamiti.nagaur@gmail.com">
            <div className="hidden hover:text-black hover:dark:text-primary-base cursor-pointer lg:flex">
              saisevasamiti.nagaur@gmail.com
            </div>
          </Link>
        </div>
        <div className="m-auto mr-0">
          <Link href="#newsletter">
            <Button text="Subscribe" outline={false} />
          </Link>
        </div>
      </div>
      <Navbar />
      {children}
      <Footer />
      <div className="flex flex-col lg:flex-row items-center justify-center text-secondary-dark dark:text-primary-base p-4 font-semibold tracking-wide bg-white dark:bg-green-950 shadow-lg">
        <div className="flex">
          <span className="px-1 flex items-center">
            Copyright <Copyright />
            {new Date().getFullYear()}
          </span>
          | All rights reserved.
        </div>
        <div className="p-0 lg:px-1">
          This website was developed by
          <Link
            href="https://ashutosh-portfolio-one.vercel.app/"
            target="_blank"
            className="px-2 text-primary-dark hover:text-accent-base hover:scale-105 transition-all ease-in-out"
          >
            @shutosh
          </Link>
        </div>
      </div>
    </div>
  )
}
