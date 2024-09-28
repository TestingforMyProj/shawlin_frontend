import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Element } from 'react-scroll';
import Slider from 'react-slick';
import Swal from 'sweetalert2';
import Loader from '../Pages/Loader';

const Landio = () => {
  const formRef = useRef(null);
  const [highlight, setHighlight] = useState(false);
  const [loading, setLoading] = useState(false); // Added loading state

  const handleScrollToForm = () => {
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth' });
      setHighlight(true);

      // Remove highlight after the animation duration
      setTimeout(() => {
        setHighlight(false);
      }, 2000); // Adjust duration as needed
    }
  };

  const [showMore, setShowMore] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);

  const handleReadMore = () => {
    setShowMore(!showMore);
  };

  const handleDownloadPDF = () => {
    const pdfUrl = '/assets/img/shawlin_Solution.pdf';
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = 'client_reviews.pdf';
    link.click();
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const slidermenu = React.useRef(null);

  const toggleFAQ = (index) => {
    if (activeIndex === index) {
      setActiveIndex(null);
    } else {
      setActiveIndex(index);
    }
  };

  const [formData, setFormData] = useState({
    name: '',
    number: '',
    email: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation check for empty fields
    if (!formData.name || !formData.number || !formData.email) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'All fields are required!',
      });
      return;
    }

    setLoading(true); // Set loading to true on submit

    try {
      // Send data to the backend
      const response = await axios.post('https://shawlin-backend.vercel.app/v1/form/create-form', {
        name: formData.name,
        phone: formData.number,
        email: formData.email,
      });

      if (response.data.success) {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Form Submitted Successfully!',
        });
        setFormData({
          name: '',
          number: '',
          email: '',
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Form Submission Failed!',
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.message,
      });
    } finally {
      setLoading(false); // Set loading to false after submission
    }
  };

  const getSlidesToShow = () => {
    const width = window.innerWidth;
    if (width >= 1200) {
      return 4;
    } else if (width >= 992) {
      return 3;
    } else if (width >= 576) {
      return 2;
    } else {
      return 1;
    }
  };

  const [slidesToShow, setSlidesToShow] = useState(getSlidesToShow());

  useEffect(() => {
    const handleResize = () => {
      setSlidesToShow(getSlidesToShow());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const settings1 = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 6000,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    arrows: true,
  };

  const [isReadMore1, setIsReadMore1] = useState(false);
  const [isReadMore2, setIsReadMore2] = useState(false);
  const [isReadMore3, setIsReadMore3] = useState(false);

  const toggleReadMore1 = () => setIsReadMore1(!isReadMore1);
  const toggleReadMore2 = () => setIsReadMore2(!isReadMore2);
  const toggleReadMore3 = () => setIsReadMore3(!isReadMore3);

  return (
    <Element name='home'>
      <>
        {/* ======Choosing Sec start======= */}
        <section className='bg_main'>
          <div className='container py-5 text-light'>
            <div className='row'>
              <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 align-items-center d-flex choosing_Sec'>
                <div className=''>
                  <h1>Why Choose Us?</h1>
                  <p className='m-0 pb-3'><span className="fs-4 align-middle" style={{ color: "lightgreen" }}>✔</span><strong> Coaches from Top Firms:</strong> Our expert coaches come from leading firms like JP Morgan, Morgan Stanley, and Deloitte, bringing real-world insights to help you succeed.</p>
                  <p className='m-0 pb-3'><span className="fs-4 align-middle" style={{ color: "lightgreen" }}>✔</span><strong> Unlimited Support Until Satisfaction:</strong> We work with students one-on-one, offering unlimited revisions and personalized feedback until you're fully satisfied.</p>
                  <p className='m-0 pb-3'><span className="fs-4 align-middle" style={{ color: "lightgreen" }}>✔</span><strong> Tailored to International Students:</strong> Our services are specially designed for international students, helping them navigate job markets in the UK, US, Canada, and Europe with confidence.</p>
                </div>
              </div>
              {/* ====FORM==== */}
              {loading && <Loader />}
              <div className='col-lg-6 col-md-6 col-sm-12 col-12 d-flex justify-content-center align-items-center form_main'
                ref={formRef}>
                <div className='form-wrapper'>
                  <form className={`contact-form ${highlight ? 'highlight' : ''}`} onSubmit={handleSubmit}>
                    <div className='form-group'>
                      <input
                        type='text'
                        id='name'
                        name='name'
                        className='form-control'
                        placeholder='Name'
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className='form-group'>
                      <input
                        type='tel'
                        id='number'
                        name='number'
                        className='form-control'
                        placeholder='Phone Number'
                        value={formData.number}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className='form-group'>
                      <input
                        type='email'
                        id='email'
                        name='email'
                        className='form-control'
                        placeholder='Email'
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <button type='submit' className='btn-submit fw-bold'>
                      Talk To Expert
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* ======Choosing Sec end======= */}
        {/* ======Featured Sec start======= */}
        <section className="container-fluid py-4 box_feature">
          <div className='row'>
            <div className='col-lg-3 col-md-3 align-items-center d-flex justify-content-center'>
              <div>
                <h2 className='text-center fw-bold title_color featuredin_sec'>Featured In</h2>
              </div>
            </div>
            <div className='col-lg-9 col-md-9'>
              <div className="marquee">
                <div className="d-flex justify-content-between align-items-center">
                  <img alt="Brand 1" src="assets/img/brand-3.png" className="img-fluid scrolling-image" />
                  <img alt="Brand 2" src="assets/img/brand-2.png" className="img-fluid scrolling-image" />
                  <img alt="Brand 3" src="assets/img/brand-1.png" className="img-fluid scrolling-image" />
                  <img alt="Brand 4" src="assets/img/brand-4.png" className="img-fluid scrolling-image" />
                  <img alt="Brand 5" src="assets/img/brand-5.png" className="img-fluid scrolling-image" />
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* ======Featured Sec end======= */}
        {/* who we are Sec start */}
        <section className='container px_width'>
          <div className='row info_sec'>
            <div className='col-lg-5 col-md-5 col-sm-12 col-12 justify-content-center d-flex align-items-center'>
              <div className="underline_verticaly"></div>

              <div>
                <p>Secure More Interview Spots!</p>
                <h2 className='title_color'>Who We Are</h2>
              </div>
            </div>
            <div className='col-lg-7 col-md-7 col-sm-12 col-12 justify-content-center d-flex align-items-center info_main_Sec'>
              <div>
                <p className='info_sec_p'>At <strong>Shawlin Solutions</strong>, we're passionate about helping international students and professionals achieve their career goals. Our team of experienced coaches, hailing from top firms like Morgan Stanley, Deloitte, Goldman Sachs, J.P. Morgan, and world-renowned universities like University of Florida and Imperial College London, offers personalized guidance to help you stand out in the competitive job market.
                  We create customized resumes, cover letters, and LinkedIn profiles that truly showcase your skills and experiences. Through our effective coaching techniques, we've assisted many people in getting more interviews and achieving their dream jobs.</p>
              </div>
            </div>
          </div>
        </section>
        {/* who we are Sec end */}
        {/* ======Join Sec start======= */}
        <section className='container my-5 py-3'>
          <h2 className='text-center fw-bold title_color' style={{ wordSpacing: "3px" }}>How Our 1-1 Coaching Works?</h2>
          <div className="underline mb-3"></div>
          <div className='mx-auto d-block pt-3'>
            <div className='row coaching_Sec'>
              <div className='col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12'>
                <div className="step-card w_content_box">
                  <div className="icon"><img alt='' src='assets/img/1.png' className='img-fluid'></img></div>
                  <h3>Resume</h3>
                  <p className={!isReadMore1 ? 'read_more' : ''} style={{ textAlign: "justify" }}>
                    <p><span className='fw-bold'>Step 1:</span> Personalized Coach Matching Once you join us, we carefully match you with a coach who has expertise in your specific field. Our coaches are professionals from top firms with extensive experience in resume writing and industry-specific knowledge. This ensures you get tailored guidance to enhance your resume and make it stand out.</p>
                    <p><span className='fw-bold'>Step 2:</span> Initial Consultation and Background Assessment In the first 1-1 session, we begin with an in-depth discussion of your career goals, target roles, and the job description (JD) for the positions you're applying for. The coach will thoroughly review your existing resume, identify areas for improvement, and learn about your background, skills, and achievements to align them with the JD.</p>
                    <p><span className='fw-bold'>Step 3:</span> Resume Drafting and Development During the second session, your coach will present a draft or final version of your resume. You’ll have the opportunity to ask questions, suggest changes, and receive advice on how to tailor the resume for different job applications. Your coach will also guide you on addressing interview questions based on your resume.</p>
                    <p><span className='fw-bold'>Step 4:</span> Revisions and Finalization We provide up to 5 revisions to ensure your resume is polished and meets your expectations. Our goal is to make sure you’re confident in your resume and well-prepared for job applications, giving you a competitive edge in landing interviews.</p>
                  </p>
                  <button className='step1' onClick={toggleReadMore1}>
                    {isReadMore1 ? 'Read Less' : 'Read More'}
                  </button>
                </div>
              </div>
              <div className='col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12'>
                <div className="step-card w_content_box">
                  <div className="icon icon1"><img alt='' src='assets/img/2.png' className='img-fluid'></img></div>
                  <h3>Cover Letter</h3>
                  <p className={!isReadMore2 ? 'read_more' : ''} style={{ textAlign: "justify" }}>
                    <p><span className='fw-bold'>Job Requirements Review</span>
                      &nbsp;We go over the job description to help tailor your cover letter to the specific role.</p>
                    <p><span className='fw-bold'>Cover Letter Structure</span>
                      &nbsp;Guidance on how to organize your content to make it clear and impactful.</p>
                    <p><span className='fw-bold'> Showcasing Key Skills</span>
                      &nbsp;Help in highlighting your most relevant skills and achievements.</p>
                    <p><span className='fw-bold'>Personalization</span>
                      &nbsp;Tips on how to make the letter sound genuine and enthusiastic without losing professionalism.</p>
                    <p><span className='fw-bold'>Tailoring for Multiple Jobs</span>
                      &nbsp;Strategies to adapt your cover letter for different roles efficiently.</p>
                    <p><span className='fw-bold'>Final Touches</span>
                      &nbsp;A complete review with feedback to ensure your cover letter is polished and ready to submit.</p>
                  </p>
                  <button className='step2' onClick={toggleReadMore2}>
                    {isReadMore2 ? 'Read Less' : 'Read More'}
                  </button>
                </div>
              </div>
              <div className='col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12 md_device_middle'>
                <div className="step-card w_content_box">
                  <div className="icon icon2"><img alt='' src='assets/img/3.png' className='img-fluid'></img></div>
                  <h3>LinkedIn</h3>
                  <p className={!isReadMore3 ? 'read_more' : ''} style={{ textAlign: "justify" }}>
                    <p>This session is designed to optimize your LinkedIn profile, making it more attractive to recruiters and industry professionals.</p>
                    <p><span className='fw-bold'>Profile Review</span>
                      &nbsp;The session begins with a detailed analysis of your profile, offering specific suggestions for improvement to enhance your visibility.</p>
                    <p><span className='fw-bold'>Headline and Summary</span>
                      Crafting a compelling headline and summary that effectively showcase your skills and career goals is a key focus.</p>
                    <p><span className='fw-bold'>Experience Section</span>
                      &nbsp;Your work experience and achievements are refined to ensure they are clearly communicated and relevant to the roles you’re targeting.</p>
                    <p><span className='fw-bold'>Skills and Endorsements</span>
                      &nbsp;Advice is provided on which skills to highlight and how to secure endorsements that strengthen your profile.</p>
                    <p><span className='fw-bold'>Networking Strategies</span>
                      &nbsp;Effective strategies are introduced to build meaningful connections with professionals in your industry.</p>
                    <p><span className='fw-bold'>Job Search Tips</span>
                      &nbsp;Practical tips on using LinkedIn’s job search tools are shared to help you better tailor your applications.</p>
                    <p><span className='fw-bold'>Recommendations</span>
                      &nbsp;Guidance is provided on how to request and write strong recommendations to enhance your credibility.</p>
                    <p><span className='fw-bold'>Cold Email Guidance</span>
                      &nbsp;You’ll also learn how to write effective cold emails and approach informal interviews to build professional relationships.</p>
                  </p>
                  <button className='step3' onClick={toggleReadMore3}>
                    {isReadMore3 ? 'Read Less' : 'Read More'}
                  </button>
                </div>
              </div>
              {/* <div className='col-xl-3 col-lg-3 col-md-6 col-sm-12 col-12'>
            <div className="step-card">
              <div className="icon icon3"><i className="ri-verified-badge-line"></i></div>
              <h3>Ready To Go</h3>
              <p>But must explain mistake denouncie pleasure praisin was born complete</p>
              <button className='step4'>Read More</button>
            </div>
          </div> */}
            </div>
          </div>
          <a href="https://wa.me/+447918261080" target="_blank" rel="noopener noreferrer">
            <button type='submit' className='mt-5 fw-bold mx-auto d-block expert_btn' onClick={handleScrollToForm}>
              Talk To Expert
            </button>
          </a>
        </section>
        {/* ======Join Sec end======= */}
        {/* ======Services Sec start======= */}
        <Element name='services' className='element'>
          <section className='container my-5 py-3'>
            <h2 className='text-center fw-bold title_color'>Our Services</h2>
            <div className="underline mb-3"></div>
            <div className='row'>
              <div className='col-xl-3 col-lg-3 col-md-6 col-sm-12 col-12'>
                <div className="card-container">
                  <div className="save-tag">SAVE £90</div>
                  <h2 className="plan-title basic">4 SESSIONS</h2>
                  <h1 className="price">£550</h1>
                  <p className="description">Resume / Cover Letter / Linkedin</p>
                  <ul className="feature-list">
                    <li className="feature-item">
                      <span className="check-mark">✔</span> Unlimited revisions with expert coaching.
                    </li>
                    <li className="feature-item">
                      <span className="check-mark">✔</span> ATS optimize Resume and cover-letter
                    </li>
                    <li className="feature-item">
                      <span className="check-mark">✔</span> Learn networking and cold-email strategies to stand out.
                    </li>
                    <li className="feature-item ">
                      <span className="check-mark">✔</span> Keyword optimization to showcase your top skills.
                    </li>
                  </ul>
                  <Link to="https://buy.stripe.com/00g00Keje0BO1c4dR3" target="_blank">
                    <button className="select-button">Buy Now →</button>
                  </Link>
                </div>
              </div>
              <div className='col-xl-3 col-lg-3 col-md-6 col-sm-12 col-12'>
                <div className="card-container">
                  <h2 className="plan-title basic">2 SESSIONS</h2>
                  <h1 className="price">£300</h1>
                  <p className="description">Resume</p>
                  <ul className="feature-list">
                    <li className="feature-item">
                      <span className="check-mark">✔</span> Unlimited revisions until you're fully satisfied
                    </li>
                    <li className="feature-item">
                      <span className="check-mark">✔</span> Work one-on-one with an expert coach
                    </li>
                    <li className="feature-item">
                      <span className="check-mark">✔</span> Master Resume tailoring and interview techniques
                    </li>
                    <li className="feature-item">
                      <span className="check-mark">✔</span> Optimized to bypass recruiters' screening and ATS filters
                    </li>
                  </ul>
                  <Link to="https://buy.stripe.com/cN200Ka2Ybgsf2UcMV" target="_blank">
                    <button className="select-button disabled">Buy Now →</button>
                  </Link>
                </div>
              </div>
              <div className='col-xl-3 col-lg-3 col-md-6 col-sm-12 col-12'>
                <div className="card-container">
                  <h2 className="plan-title basic">1 SESSIONS</h2>
                  <h1 className="price">£170</h1>
                  <p className="description">Cover Letter</p>
                  <ul className="feature-list">
                    <li className="feature-item">
                      <span className="check-mark">✔</span> Unlimited revisions until you're fully satisfied
                    </li>
                    <li className="feature-item">
                      <span className="check-mark">✔</span> Work one-on-one with an expert coach
                    </li>
                    <li className="feature-item ">
                      <span className="check-mark">✔</span> Learn how to tailor your cover letter to stand out
                    </li>
                    <li className="feature-item ">
                      <span className="check-mark">✔</span> Optimized to bypass recruiters' screening and ATS filters
                    </li>
                  </ul>
                  <Link to="https://buy.stripe.com/14kdRAfni70cg6Y007" target="_blank">
                    <button className="select-button disabled">Buy Now →</button>
                  </Link>
                </div>
              </div>
              <div className='col-xl-3 col-lg-3 col-md-6 col-sm-12 col-12'>
                <div className="card-container">
                  {/* <div className="save-tag">SAVE 45%</div> */}
                  <h2 className="plan-title basic">1 SESSIONS</h2>
                  <h1 className="price">£170</h1>
                  <p className="description">Linkedin</p>
                  <ul className="feature-list">
                    <li className="feature-item">
                      <span className="check-mark">✔</span> Unlimited revisions until you're fully satisfied
                    </li>
                    <li className="feature-item">
                      <span className="check-mark">✔</span> Work one-on-one with an expert coach
                    </li>
                    <li className="feature-item">
                      <span className="check-mark">✔</span> Learn effective networking and cold-emailing strategies
                    </li>
                    <li className="feature-item ">
                      <span className="check-mark">✔</span> Keyword-optimized to showcase your top skills and stand out in searches
                    </li>
                  </ul>
                  <Link to="https://buy.stripe.com/14k28S3EA1FS3kc5ks" target="_blank">
                    <button className="select-button">Buy Now →</button>
                  </Link>
                </div>
              </div>
              <p className='text-center fw-bold' style={{ letterSpacing: "0.5px" }}>
              Once the payment is completed, our team will contact you to schedule a call with the coach based on their availability.</p>
            </div>
          </section>
        </Element>
        {/* ======Services Sec end======= */}
        {/* ======Budget Sec start======= */}
        <section className='container my-5 py-3'>
          <h2 className='text-center fw-bold title_color'>Have budget constraints?</h2>
          <p className='text-center' style={{ letterSpacing: "0.5px" }}>No problem, choose our non-coaching services</p>
          <div className="underline mb-3"></div>
          <div className='mx-auto d-block'>
            <div className='row card_ps'>
              <div className='col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12'>
                <div className="card-container w-container">
                  {/* <h2 className="plan-title basic">BASIC PLAN</h2> */}
                  <div className="cart_underline mb-4"></div>
                  <h1 className="price">£150</h1>
                  <p className="description">Resume</p>
                  <ul className="feature-list">
                    <li className="feature-item ">
                      <span className="check-mark">✔</span> Up to 5 revisions for your Resume
                    </li>
                    <li className="feature-item">
                      <span className="check-mark">✔</span> No coaching session – questionnaire-based process
                    </li>
                    <li className="feature-item ">
                      <span className="check-mark">✔</span> 3-5 day turnaround time
                    </li>
                    <li className="feature-item ">
                      <span className="check-mark">✔</span> Optimized to bypass recruiters' screening and ATS filters
                    </li>
                  </ul>
                  <Link to="https://buy.stripe.com/cN2cNw6QM84g4ogfZ8" target="_blank">
                    <button className="select-button">Buy Now →</button>
                  </Link>
                </div>
              </div>
              <div className='col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12'>
                <div className="card-container w-container">
                  {/* <div className="save-tag">SAVE 45%</div> */}
                  {/* <h2 className="plan-title">POPULAR PLAN</h2> */}
                  <div className="cart_underline mb-4"></div>
                  <h1 className="price">£120</h1>
                  <p className="description">Cover Letter</p>
                  <ul className="feature-list">
                    <li className="feature-item">
                      <span className="check-mark">✔</span> Up to 5 revisions for your cover letter
                    </li>
                    <li className="feature-item">
                      <span className="check-mark">✔</span> No coaching session – questionnaire-based process
                    </li>
                    <li className="feature-item">
                      <span className="check-mark">✔</span> 3-5 day turnaround time
                    </li>
                    <li className="feature-item ">
                      <span className="check-mark">✔</span> Highlights your distinct value to stand out to employers
                    </li>
                  </ul>
                  <Link to="https://buy.stripe.com/7sI00Keje98k5skaES" target="_blank">
                    <button className="select-button">Buy Now →</button>
                  </Link>
                </div>
              </div>
              <div className='col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12 md_device_middle'>
                <div className="card-container w-container">
                  {/* <h2 className="plan-title basic">BASIC PLAN</h2> */}
                  <div className="cart_underline mb-4"></div>
                  <h1 className="price">£130</h1>
                  <p className="description">Linkedin</p>
                  <ul className="feature-list">
                    <li className="feature-item">
                      <span className="check-mark">✔</span> Up to 5 revisions for your LinkedIn
                    </li>
                    <li className="feature-item">
                      <span className="check-mark">✔</span> No coaching session – questionnaire-based process
                    </li>
                    <li className="feature-item ">
                      <span className="check-mark">✔</span> 3-5 day turnaround time
                    </li>
                    <li className="feature-item ">
                      <span className="check-mark">✔</span> Keyword-optimized to showcase your top skills and stand out in searches
                    </li>
                  </ul>
                  <Link to="https://buy.stripe.com/fZeeVEa2YesE3kccMX" target="_blank">
                    <button className="select-button">Buy Now →</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* ======Budget Sec end======= */}
        {/* ======video Sec start======= */}
        {/* <section className='container my-5 py-3'>
        <h2 className='text-center fw-bold'>Unable to decide?</h2>
        <div className="underline mb-4"></div>
        <div className='row'>
          <div className='col-xl-3 col-lg-3 col-md-6 col-sm-12 col-12'>
            <video loop controls muted className='item1 video'>
              <source src="https://rajivtalreja.co.in/wp-content/uploads/2023/04/Anie-Macato-1.mp4" type="video/mp4" />
            </video>
          </div>
          <div className='col-xl-3 col-lg-3 col-md-6 col-sm-12 col-12'>
            <video loop controls muted className='item1 video'>
              <source src="https://rajivtalreja.co.in/wp-content/uploads/2023/04/Deepak-Bharadia-2.mp4" type="video/mp4" />
            </video>
          </div>
          <div className='col-xl-3 col-lg-3 col-md-6 col-sm-12 col-12'>
            <video loop controls muted className='item1 item2 video'>
              <source src="https://rajivtalreja.co.in/wp-content/uploads/2023/04/Dr-Shwetha-Iyengar-3.mp4" type="video/mp4" />
            </video>
          </div>
          <div className='col-xl-3 col-lg-3 col-md-6 col-sm-12 col-12'>
            <video loop controls muted className='item1 video p-1'>
              <source src="https://rajivtalreja.co.in/wp-content/uploads/2023/04/Jorhiza-Asis-4.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </section> */}
        {/* ======video Sec end======= */}
        {/* ======summary Sec start======= */}
        <section className='container text-center content_sec my-5 px-5'>
          <p>Not sure which is right for you? WhatsApp us and we'll be happy to help you - we're available 24/7.</p>
          <p className='m-0'>WhatsApp us on <span>+44 7918 261080</span> or <span>chat now</span> with one of our friendly Resume Consultants, who'll work with you to find Resume that cloud land your perfect job.</p>
        </section>
        {/* ======summary Sec end======= */}
        {/* ======Universities Sec start======= */}
        <section className='container my-5'>
          <h2 className='text-center fw-bold pt-5 title_color'>Our mentors are from top firms & universities</h2>
          <div className="underline mb-4"></div>
          <div className='row'>
            <div className='col-lg-4 col-md-6 col-sm-6 col-12'>
              <div className='univer_box'>
                <img alt='' src='assets/img/universities1.jpeg' className='univer_img mx-auto d-block'></img>
              </div>
            </div>
            <div className='col-lg-4 col-md-6 col-sm-6 col-12'>
              <div className='univer_box'>
                <img alt='' src='assets/img/universities2.jpeg' className='univer_img mx-auto d-block'></img>
              </div>
            </div>
            <div className='col-lg-4 col-md-6 col-sm-6 col-12'>
              <div className='univer_box'>
                <img alt='' src='assets/img/universities3.jpeg' className='univer_img mx-auto d-block'></img>
              </div>
            </div>
            <div className='col-lg-4 col-md-6 col-sm-6 col-12'>
              <div className='univer_box'>
                <img alt='' src='assets/img/universities4.jpeg' className='univer_img mx-auto d-block'></img>
              </div>
            </div>
            <div className='col-lg-4 col-md-6 col-sm-6 col-12'>
              <div className='univer_box'>
                <img alt='' src='assets/img/universities5.jpeg' className='univer_img mx-auto d-block'></img>
              </div>
            </div>
            <div className='col-lg-4 col-md-6 col-sm-6 col-12'>
              <div className='py-3 univer_box'>
                <img alt='' src='assets/img/universities6.jpeg' className='univer_img mx-auto d-block'></img>
              </div>
            </div>
          </div>
        </section>

        {/* ======Universities Sec end======= */}
        {/* ======Testimonial Sec start======= */}
        <Element name='testimonial'>
          <section className='container my-5 py-3'>
            <h2 className='text-center fw-bold title_color'>Testimonial</h2>
            <div className="underline mb-4"></div>
            <div className='row coaching_Sec'>
              <div className='col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12'>
                <div className="testimonial-card">
                  <div className="stars">★★★★★</div>
                  <span className="twitter-icon"><i className="ri-twitter-fill"></i></span>
                  <p className='pt-3'>After submitting over 70 applications and facing constant rejections, I was beginning to lose hope. That’s when I decided to seek help from Shawlin’s coaching service. The coach revamped my resume, cover letter, and LinkedIn profile, and within two weeks, I received three interview calls. I’m thrilled to say I’ve secured a position with a package of $110k! Their guidance made all the difference.</p>
                  <div className="author">Anjali Malhotra</div>
                </div>
              </div>
              <div className='col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12'>
                <div className="testimonial-card">
                  <div className="stars">★★★★★</div>
                  <span className="twitter-icon"><i className="ri-twitter-fill"></i></span>
                  <p className='pt-3'>I was struggling to break into a consultant role and knew I needed to improve my Resume and networking strategy. With Shawlin’s coaching, I not only enhanced my resume but also learned how to effectively network on LinkedIn. I managed to connect with an employee at the company I wanted to work for. She was impressed enough to refer me, and my resume was selected. The good news is I got the job!</p>
                  <div className="author">Anonymous</div>
                </div>
              </div>
              <div className='col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12 md_device_middle'>
                <div className="testimonial-card">
                  <div className="stars">★★★★★</div>
                  <span className="twitter-icon"><i className="ri-twitter-fill"></i></span>
                  <p className='pt-3'>
                    Even with 10+ years of experience, I was constantly getting rejected without making it to the interview stage.
                    Frustrated and unsure of what to do next, I decided to work with Shawlin’s coaching service. The coach helped me
                    refine my Resume, cover letter, and LinkedIn profile, and the results were immediate.
                    {showMore ? (
                      <>
                        Within a month, I received multiple interview offers, and now I’m working as a Product Manager with a £45,000 package.
                        The coach’s support was a game-changer for my career.
                        <span onClick={handleReadMore} style={{ color: '#678fde', cursor: 'pointer' }}> Show Less</span>
                      </>
                    ) : (
                      <>
                        Within a month, I received multiple interview offers, and now I’m working as a...
                        <span onClick={handleReadMore} style={{ color: '#678fde', cursor: 'pointer' }}> Read More</span>
                      </>
                    )}
                  </p>
                  <div className="author">Aderonke</div>
                </div>
              </div>
              {/* <div className='col-xl-3 col-lg-3 col-md-6 col-sm-12 col-12'>
            <div className="testimonial-card">
              <div className="stars">★★★★★</div>
              <span className="twitter-icon"><i className="ri-twitter-fill"></i></span>
              <h3>"Fresh Design"</h3>
              <p>Sed ut perspiciatis omnis natus error sit voluptatem accusantium doloremque laudane totam rem.</p>
              <div className="author">David A. Ames</div>
            </div>
          </div> */}
            </div>
          </section>
        </Element>
        {/* ======Testimonial Sec end======= */}
        {/* ======Reviews Sec start======= */}
        <section className='container my-5 py-3'>
          <h2 className='text-center fw-bold title_color'>Client Reviews</h2>
          <div className="underline mb-4"></div>
          <div className='row position-relative'>
            <div className='py-2'>
              <Slider ref={slidermenu} {...settings1}>
                <div className='card border-0'>
                  <img alt='' src='assets/img/review1.jpg' className='img-fluid px-2'></img>
                </div>
                <div className='card border-0'>
                  <img alt='' src='assets/img/review2.jpg' className='img-fluid px-2'></img>
                </div>
                <div className='card border-0'>
                  <img alt='' src='assets/img/review3.jpg' className='img-fluid px-2'></img>
                </div>
                <div className='card border-0'>
                  <img alt='' src='assets/img/review4.jpg' className='img-fluid px-2'></img>
                </div>
                <div className='card border-0'>
                  <img alt='' src='assets/img/review5.jpg' className='img-fluid px-2'></img>
                </div>
              </Slider>
            </div>
            <button className='btn btn_pdf mx-auto d-block text-light bg-success py-2 mt-5 fw-bold' onClick={handleDownloadPDF}>View more success stories</button>
          </div>
        </section>
        {/* ======Reviews Sec end======= */}
        {/* ======FQS Sec start======= */}
        <Element name='faqs'>
          <section className='container my-5 py-3'>
            <h2 className='text-center fw-bold title_color'>Frequently Asked Questions:</h2>
            <div className="underline mb-4"></div>
            <div className='row'>
              <div className='faq-container'>
                {faqData.map((faq, index) => (
                  <div key={index} className='faq'>
                    <div
                      className='faq-question'
                      onClick={() => toggleFAQ(index)}
                      style={{ cursor: 'pointer' }}
                    >
                      {faq.question}
                      <span className='toggle-icon'>
                        {activeIndex === index ? '-' : '+'}
                      </span>
                    </div>
                    <div
                      className={`faq-answer ${activeIndex === index ? 'open' : ''}`}
                      style={{ display: activeIndex === index ? 'block' : 'none' }}
                    >
                      {faq.answer}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <a href="https://wa.me/+447918261080" target="_blank" rel="noopener noreferrer">
              <button type='submit' className='mt-5 fw-bold mx-auto d-block expert_btn' onClick={handleScrollToForm}>
                Talk To Expert
              </button>
            </a>
          </section>
        </Element>
        {/* ======FQS Sec end======= */}
        <a href="https://wa.me/+447918261080" target="_blank" rel="noopener noreferrer" className="whatsapp-logo">
          <i class="ri-whatsapp-fill text-success fs-1"></i>
        </a>
      </>
    </Element>
  )
}

const faqData = [
  {
    question: "Who is our 1-1 coaching program designed for?",
    answer: 'If you’ve submitted over 50 job applications and haven’t received an interview, it’s time to rethink your resume and cover letter. The job market is highly competitive, and 70-80% of applications are rejected during the first round of screening. Having experience alone doesn’t guarantee an interview. Our 1-1 coaching can make a significant difference. We provide personalized support to improve your resume and cover letter, helping you stand out from the competition. Clients who work with us see a 40% increase in interview invitations. Our expert coaches work directly with you to refine your applications and enhance your chances of getting noticed.',
  },
  {
    question: "How is your 1-1 coaching different from your non-coaching services?",
    answer: 'Our 1-1 coaching provides personalized guidance from industry professionals to help you craft and refine your Resume, cover letter, and LinkedIn profile. Our coaches carefully review the details of your experiences and incorporate them into your applications. For our non-coaching service, we offer the same high-quality service, but it won’t be as tailored to specific jobs you want to apply for.',
  },
  {
    question: 'Do you work with international students and professionals?',
    answer: 'Absolutely! We specialize in helping international students and professionals, particularly those based in the UK, US, Canada, and Europe.',
  },
  {
    question: 'How long does it take to get my Resume, cover letter, or LinkedIn profile ready?',
    answer: 'For 1-1 coaching, the timeline varies based on your progress. However, if you choose our non-coaching service, we can typically complete your Resume, cover letter, or LinkedIn profile within 3-5 business days.',
  },
  {
    question: 'Do you offer installment payment options for your 1-1 coaching services?',
    answer: 'Yes, we offer a convenient two-installment payment plan. You can pay half of the fee before the first session, and the remaining half before the second session. This helps make our 1-1 coaching services more affordable and manageable.',
  },
  {
    question: 'What if I need revisions after the Resume, cover letter, or LinkedIn profile is done?',
    answer: 'Your satisfaction is our priority. We offer five rounds of free revisions for non-coaching services and unlimited revisions for our 1-1 coaching sessions to ensure you are fully satisfied.',
  },
  {
    question: 'What industries do your coaches specialize in?',
    answer: 'Our coaches come from various industries, and we match you with a professional who understands the specific requirements of your field, whether it’s healthcare, IT, business, or other sectors.',
  },
  {
    question: 'How do you ensure that my Resume and cover letter are tailored to my career goals?',
    answer: 'During 1-1 coaching, we work closely with you to understand your career goals, skills, and experiences, creating a customized Resume and cover letter that align with your objectives and the jobs you want to apply for.',
  },
  {
    question: 'Can you help with job-specific Resumes and cover letters?',
    answer: 'Yes, we can create tailored Resumes and cover letters for specific job applications.',
  },
  {
    question: 'What if I have no prior work experience?',
    answer: 'Whether you’re a student or career changer with limited experience, we will help highlight your skills, education, and any relevant projects or internships to make your Resume and cover letter stand out.',
  },
  {
    question: 'What happens if I’m not satisfied with the final Resume, cover letter, or LinkedIn profile?',
    answer: 'For 1-1 coaching clients, we offer ongoing revisions until you’re happy with the results. For our budget service, we offer one round of revisions at no additional cost.',
  },
];
export default Landio