import Image from "next/image";
import "../../styles/styles.css"
import ScrollHandler from "../../../public/components/ScrollHandler";
import MenuHandler from "../../../public/components/MenuClient";
import Waitlist from "../../../public/components/Waitlist";
import HomeImg from "../../../public/img/home-img.png";
import { MdEmail } from "react-icons/md";
import Link from "next/link";
export default function PrivacyPolicy() {

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
                                <Link href="/"><li className="nav-item text-[#4b2e38] block hover:bg-[#e9b8b2] text-left no-underline text-[18px] py-[1.2rem] px-[2rem] font-semibold" data-scroll-to="container" data-close-menu>Home</li></Link>
                                <Link href="/#main-content-community"><li className="nav-item text-[#4b2e38] block hover:bg-[#e9b8b2] text-left no-underline py-[1.2rem] px-[2rem] text-[18px] font-semibold" data-scroll-to="main-content-community" data-close-menu>Communities</li></Link>
                                <Link href="/#main-content-waitlist"><li className="nav-item text-[#4b2e38] block hover:bg-[#e9b8b2] text-left no-underline py-[1.2rem] px-[2rem] text-[18px] font-semibold" data-scroll-to="main-content-waitlist" data-close-menu>Winners</li></Link>


                            </ul>
                        </nav>
                    </div>

                    <div className="align-logo-main-content">
                        <img className="home-vector" src="/img/home-vector.png" alt="Home Vector" />



                        <img className="logo" src="/img/meisie-logo.png" alt="Logo" />

                        <div id="">
                            <div className="flex justify-center flex-col items-start max-w-4xl mx-auto px-4 py-8 text-[#4b2e38]">
                                <h1 className="text-5xl font-bold text-[#4b2e38] pt-20 sm:pt-10">Privacy Policy</h1>
                                <div>
                                    <p className="text-lg mt-4 font-semibold">Last updated: March 12, 2026</p>
                                    <br />

                                    <p className="">Meisie Network (“we,” “our,” or “us”) operates the <strong>Meisie Network</strong> mobile application (the “Service”). This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our mobile application and related services.

                                        By using Meisie Network, you agree to the collection and use of information in accordance with this policy.</p>

                                    <hr className="bg-black h-px my-4"></hr>
                                    <h1 className="font-bold text-2xl pb-4 pt-4">1. Information we collect</h1>
                                    <ul>
                                        <li className=""><strong>Personal Information:</strong> When you create an account or interact with the platform, we may collect:</li>
                                        <ul className="indent-5 pt-1">
                                            <li>• Name or username</li>
                                            <li>• Email address</li>
                                            <li>• Profile photo</li>
                                            <li>• Account credentials</li>
                                            <li>• Optional profile details (bio, interests, location)</li>
                                        </ul>
                                        <br />

                                        <li><strong>User Content:</strong> We collect content that you voluntarily share on the platform, including: </li>
                                        <ul className="indent-5 pt-1">
                                            <li>• Posts</li>
                                            <li>• Comments</li>
                                            <li>• Messages</li>
                                            <li>• Media uploads (photos or videos)</li>
                                        </ul>
                                        <br />

                                        <li><strong>Usage Data:</strong> We may automatically collect information about how the Service is accessed and used, including:</li>
                                        <ul className="indent-5 pt-1">
                                            <li>• Device Type</li>
                                            <li>• Device identifiers</li>
                                            <li>• Operating system</li>
                                            <li>• IP address</li>
                                            <li>• App usage statistics</li>
                                            <li>• Crash reports</li>

                                        </ul>
                                        <br />

                                        <li><strong>Location Data:</strong> </li>
                                        <p>If enabled, we may collect approximate location information to improve user experience and relevant content delivery.</p>
                                    </ul>
                                    <hr className="bg-black h-px my-4"></hr>

                                    <h1 className="font-bold text-2xl pb-4 pt-4">2. How we use your information</h1>
                                    <p>We use the information we collect for various purposes, including to:</p>
                                    <br />

                                    <ul className="indent-5 pt-1">
                                        <li>• To create and manage user accounts</li>
                                        <li>• To operate and maintain the platform</li>
                                        <li>• To allow users to connect and interact with others</li>
                                        <li>• To personalize content and recommendations</li>
                                        <li>• To monitor usage and improve performance</li>
                                        <li>• To detect and prevent fraude, abuse, or security issues</li>

                                    </ul>
                                    <hr className="bg-black h-px my-4"></hr>

                                    <h1 className="font-bold text-2xl pb-4 pt-4">3. How we share information</h1>
                                    <p>We do not sell your personal information. We may share your information in the following ways:</p>
                                    <br />

                                    <ul>
                                        <li><strong>Service providers:</strong> We may share data with third-party providers that help operate the platforms, such as:</li>
                                        <br />

                                        <ul className="indent-5 pt-1">
                                            <li>• Cloud hosting providers</li>
                                            <li>• Analytics providers</li>
                                            <li>• Security services</li>
                                            <li>• Payment processors (if applicable)</li>

                                        </ul>                                   <br />

                                        <p>These providers are contractually required to safeguard user data,</p>
                                        <br />

                                        <li><strong>Legal Requirements:</strong> We may disclose information if required to do so by law or in response to valid legal requests.</li>
                                        <br />

                                        <li><strong>Business Transfers:</strong> If Meisie Network is involved in a merger, acquisition, or asset sale, user information may be transferred as part of that transaction.</li>

                                    </ul>
                                    <hr className="bg-black h-px my-4"></hr>

                                    <h1 className="font-bold text-2xl pb-4 pt-4">4. Data Storage and Security</h1>
                                    <p>We take reasonable administrative, technical, and physical measures to protect personal information.
                                    </p>
                                    <br />

                                    <p>However, no method of electronic storage or internet transmission is completely secure, and we cannot guarantee absolute security.</p>

                                    <hr className="bg-black h-px my-4"></hr>

                                    <h1 className="font-bold text-2xl pb-4 pt-4">5. Data Retention</h1>
                                    <p>We retain personal information only for as long as necessary to:</p>
                                    <br />

                                    <ul>
                                        <li>- Provide and maintain the Service</li>
                                        <li>- Comply with legal obligations</li>
                                        <li>- Resolve disputes</li>
                                        <li>- Enforce our agreements</li>
                                    </ul>
                                    <br />

                                    <p>Users may request deletion of their account and associated data at any time.</p>

                                    <hr className="bg-black h-px my-4"></hr>

                                    <h1 className="font-bold text-2xl pb-4 pt-4">6. Your Privacy Rights</h1>
                                    <p>Depending on your location, you may have the right to:</p>
                                    <br />

                                    <ul>
                                        <li>- Access the personal data we hold about you</li>
                                        <li>- Correct inaccurate information</li>
                                        <li>- Request deletion of your personal data</li>
                                        <li>- Withdraw consent for data processing</li>
                                    </ul>
                                    <br />

                                    <p>To exercise these rights, contact us at the email address listed below.</p>
                                    <hr className="bg-black h-px my-4"></hr>

                                    <h1 className="font-bold text-2xl pb-4 pt-4">7. Childrens Privacy</h1>

                                    <p>Meisie network is <strong>not intended for individuals under the age of 13.</strong></p>
                                    <br />

                                    <p>We do not knowingly collect personal information from children under 13. If we become aware that we have collected personal information from a child under 13, we will take steps to delete such information.</p>
                                    <hr className="bg-black h-px my-4"></hr>

                                    <h1 className="font-bold text-2xl pb-4 pt-4">8. Third-Party Links and Services</h1>
                                    <p>Meisie network may contain links to third-party websites and services. We are not responsible for the privacy practices or content of these third parties.</p>
                                    <br />

                                    <p>Users should review the privacy policies of those third parties.</p>

                                    <hr className="bg-black h-px my-4"></hr>

                                    <h1 className="font-bold text-2xl pb-4 pt-4">9. International Data Transfers</h1>
                                    <p>User information may be processed and stored in countries outside of your jurisdiction where data protection laws may differ.</p>
                                    <br />
                                    <p>By using the Service, you consent to the transfer of information to those locations when necessary to operate the platform.</p>
                                    <hr className="bg-black h-px my-4"></hr>

                                    <h1 className="font-bold text-2xl pb-4 pt-4">10. Changes to This Privacy Policy</h1>
                                    <p>We may update this Privacy Policy periodically. Updates will be posted within the application and the “Effective Date” will be revised.</p>
                                    <br />

                                    <p>Continued use of the Service after changes constitutes acceptance of the updated policy.</p>
                                    <hr className="bg-black h-px my-4"></hr>

                                    <h1 className="font-bold text-2xl pb-4 pt-4">11. Contact Information</h1>


                                    <p>If you have any questions or concerns about this Privacy Policy, please contact us at:</p>
                                    <br />

                                    <p className="text-black"><strong>Email: </strong><a className="text-black visited:text-black hover:text-black active:text-black decoration-none" href="mailto:michell@michellbarker.com">michell@michellbarker.com</a></p>
                                    <p><strong>Address:</strong> 2219 Jane St #4, North York, ON M3N 1A3</p>

                                </div>
                            </div>
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
                                <div className="social-icons flex justify-center ">



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

            </div></div >
    );
}
