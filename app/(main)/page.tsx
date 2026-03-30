import Image from "next/image";
import "../styles/styles.css"
import ScrollHandler from "../../public/components/ScrollHandler";
import MenuHandler from "../../public/components/MenuClient";
import Waitlist from "../../public/components/Waitlist";
import HomeImg from "../../public/img/home-img.png";
import { MdEmail } from "react-icons/md";
import Link from "next/link";
export default function Home() {

  return (
    <div>
      <ScrollHandler />
      <MenuHandler />
      <div className="App">
        <img className="mobile-logo" src="/img/home-logo.png" alt="Logo" />

        <button className="menu-toggle">
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div className="menu-overlay"></div>

        <div id="container" data-section="container" >
          <div className="navigator-header">
            <nav>
              <ul className="nav-links">
                <li className="nav-item"><a href="#" data-scroll-to="container" data-close-menu>Home</a></li>
                <li className="nav-item"><a href="#" data-scroll-to="main-content-community" data-close-menu>Communities</a></li>
                <li className="nav-item"><a href="#" data-scroll-to="main-content-waitlist" data-close-menu>Winners</a></li>

              </ul>
            </nav>
          </div>

          <div className="align-logo-main-content">
            <img className="home-vector" src="/img/home-vector.png" alt="Home Vector" />

            <div className="hero-image-container">
              <Image src={HomeImg} alt="Hero Image" className="home-image" />
            </div>

            <img className="logo" src="/img/meisie-logo.png" alt="Logo" />

            <div id="main-content">
              <div className="home-text-container">
                <h1 className="home-title">Where women rise together</h1>
                <p className="home-text">Built for women, by women. Connect, collaborate, and conquer in a community
                  that celebrates you</p>
                <button className="waitlist-button" data-scroll-to="main-content-waitlist">Join the waitlist</button>
              </div>
            </div>
          </div>

          <div id="community-container">
            <div className="community-section">
              <div id="main-content-community" data-section="main-content-community">
                <h1 className="community-title">Why join Meisie network?</h1>
                <p className="community-text">A community designed to elevate and empower</p>
                <button className="waitlist-button-community" data-scroll-to="main-content-waitlist">Join the waitlist</button>
              </div>

              <div className="box-container">
                <div className="box">
                  <div className="half-circle"></div>
                  <img src="/img/connect-vector.png" className="icon" />
                  <div className="box-text">
                    <p className="box-title">Authentic Connections</p>
                    <p>Build meaningful relationships with women who understand and support your vision.</p>
                  </div>
                </div>

                <div className="box">
                  <div className="half-circle"></div>
                  <img src="/img/up-arrow-vector.png" className="icon" />
                  <div className="box-text">
                    <p className="box-title">Career Growth</p>
                    <p>Access opportunities and resources to accelerate your professional development.</p>
                  </div>
                </div>

                <div className="box">
                  <div className="half-circle"></div>
                  <img src="/img/share-vector.png" className="icon" />
                  <div className="box-text">
                    <p className="box-title">Share Knowledge</p>
                    <p>Learn from experts, share your expertise, and grow in a collaborative environment.</p>
                  </div>
                </div>

                <div className="box">
                  <div className="half-circle"></div>
                  <img src="/img/hand-vector.png" className="icon" />
                  <div className="box-text">
                    <p className="box-title">Safe Space</p>
                    <p>A women-only platform where you can be authentic, and bold without judgement.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="experience-page">
            <div className="experience-container">
              <div className="experience-box">
                <img src="/img/communities-bg-vector.png" alt="Experience 1" className="experience-bg" />
                <img src="/img/experience-img.png" alt="Experience 2" className="experience-image" />
                <div className="experience-text">
                  <h1 className="experience-title">What You'll Experience in Meisie</h1>
                  <p className="experience-main-text pb-6">A curated women-only environment designed to help you flourish personally and professionally.</p>
                  <ul>
                    <li><strong>Supportive circles:</strong> Intimate groups for real conversations.</li>
                    <li><strong>Learning Pathways:</strong> Guided themes on mindset, wellness and leadership.</li>
                    <li><strong>Mentor Moments:</strong> Short, powerful sessions with women who've walked the
                      path before you.</li>
                  </ul>
                  <button className="waitlist-button" data-scroll-to="main-content-waitlist">Join the waitlist</button>
                </div>
              </div>
            </div>
          </div>

          <div id="main-content-waitlist" data-section="main-content-waitlist">
            <div className="waitlist-container">
              <div className="waitlist-text-container">
                <p className="waitlist-text">Join our waitlist and get exclusive early access</p>
                <h1 className="waitlist-title font-bold text-3xl text-[#4b2e38]">Be the First to Know</h1>
              </div>
              <Waitlist />
            </div>
          </div>

          <footer className="footer">
            <div className="footer-content">
              <div className="footer-brand">
                <div className="footer-logo">
                  <div className="logo-text">
                    <img src="/img/footer-logo.png" className="pb-10 sm:pb-0" alt="Logo" />
                  </div>
                </div>

              </div>



              <div className="footer-column">
                <h4>Want to reach out?</h4>
                <p>Contact us here:  <br /> <MdEmail className="inline-block" /> <a className="" href="mailto:michellbarker3@gmail.com">michellbarker3@gmail.com</a></p>

              </div>

              <div className="footer-column">
                <p className="text-[#e9b8b2] font-bold">Follow Us</p>
                <div className="social-icons flex justify-center">


                  <a href="https://www.facebook.com/meisienetwork"><img src="/img/facebook-icon.png" alt="Facebook" /></a>
                  <a href="https://www.instagram.com/meisienetwork/"><img src="/img/instagram-icon.png" alt="Instagram" /></a>
                  <a href="https://www.tiktok.com/@meisienetwork"><img src="/img/tiktok-icon.png" alt="Linkedin" /></a>
                </div>

              </div>
            </div>
            <div className="flex justify-between">
              <p className="credits"><a href="https://wouessi.com">Designed by Wouessi Inc.</a></p>

              <p className="privacy-policy font-semibold"><Link href="/privacy-policy">Privacy Policy</Link></p>

            </div>
            <div className="footer-divider"></div>

            <p className="footer-bottom">© 2026 Meisie Network. All Rights Reserved</p>
          </footer>
        </div>

        <script src="script.js" defer></script>
        <script src="menu.js" defer></script>

      </div></div>
  );
}
