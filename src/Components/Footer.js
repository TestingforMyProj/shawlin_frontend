import React from 'react'
import { Link } from 'react-router-dom'
import { Element } from 'react-scroll'

const Footer = () => {
  return (
    <>
      {/* <section className='footer_shadow'>
        <footer className='container mt-5'>
          <div className='row border_fo'>
            <div className='col-xl-5 col-lg-5 col-md-10 col-sm-12 col-12 pt-5 border_footer'>
              <div>
                <img alt='footer_logo' src='' className='img-fluid'></img>
                <p className='footer_p'>
                  Quis autem vel eum iure reprehenderit qui in ea voluptate
                  velit esse quam nihile consequatur vel illum qui dolorem
                  eum fugiate.
                </p>
                <div class="email-container">
                  <input type="email" placeholder="Enter Email Address" class="email-input" />
                  <button class="email-button">
                    <i className="ri-arrow-right-line"></i>
                  </button>
                </div>

              </div>
            </div>
            <div className='col-lg-7 ps-4 pb-4 ps-5'>
              <div className='row'>
                <div className='col-lg-4 col-md-6 col-sm-6 col-6 pt-5'>
                  <div className="d-lg-flex justify-content-start">
                    <div className="widget nav-widget">
                      <h5 className="widget-title">Resources</h5>
                      <ul>
                        <li>
                          <Link to=""><i class="ri-arrow-right-s-line"></i>Development</Link>
                        </li>
                        <li>
                          <Link to=""><i class="ri-arrow-right-s-line"></i>Our Products</Link>
                        </li>
                        <li>
                          <Link to=""><i class="ri-arrow-right-s-line"></i>User Strategy</Link>
                        </li>
                        <li>
                          <Link to=""><i class="ri-arrow-right-s-line"></i>Blogs &amp; Guides</Link>
                        </li>
                        <li>
                          <Link to=""><i class="ri-arrow-right-s-line"></i>Premium Support</Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className='col-lg-4 col-md-6 col-sm-6 col-6 pt-5'>
                  <div className="d-lg-flex justify-content-start">
                    <div className="widget nav-widget">
                      <h5 className="widget-title">Informations</h5>
                      <ul>
                        <li>
                          <Link to=""><i class="ri-arrow-right-s-line"></i>About Us</Link>
                        </li>
                        <li>
                          <Link to=""><i class="ri-arrow-right-s-line"></i>Reviews</Link>
                        </li>
                        <li>
                          <Link to=""><i class="ri-arrow-right-s-line"></i>Privacy Policy</Link>
                        </li>
                        <li>
                          <Link to=""><i class="ri-arrow-right-s-line"></i>Terms &amp; Conditions</Link>
                        </li>
                        <li>
                          <Link to=""><i class="ri-arrow-right-s-line"></i>Contact Us</Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='centered-text'>
            <div className='text-left'>
              <p>© 2021 Landio. All Rights Reserved</p>
            </div>
            <div className='icons-right'>
              <i class="ri-facebook-fill fs-4"></i>
              <i class="ri-twitter-fill fs-4"></i>
              <i class="ri-youtube-fill fs-4"></i>
              <i class="ri-behance-fill fs-4"></i>
              <i class="ri-linkedin-fill fs-4"></i>
            </div>
          </div>
        </footer>
      </section> */}
      <Element name='community'>
        <section className='container-fluid footer_bg pt-5'>
          <div className='row text-center'>
            <h2 className='title_color'>Secure More Interview Spots!</h2>
            <div className='pt-3'>
              <Link to="https://www.instagram.com/shawlin_solutions/"><i class="ri-instagram-line"></i></Link>
              <Link to="https://www.facebook.com/profile.php?id=61561965557895"><i class="ri-facebook-fill"></i></Link>
            </div>
            {/* <p>Privacy policy</p> */}
            <div className='pt-5'>
              <h6>© 2024 SHAWLIN. ALL RIGHTS RESERVED.</h6>
              <Link target="_blank" to="https://techgeekzservices.com/">
                <p className='footer_p'>Powered by Teckgeekz</p>
              </Link>
            </div>
          </div>
        </section>
      </Element>
    </>
  )
}

export default Footer