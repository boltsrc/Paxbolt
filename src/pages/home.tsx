import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import { ProjectsSection } from "@/components/ProjectsSection";
import { 
  FaPython, 
  FaJava, 
  FaGithub, 
  FaEnvelope, 
  FaBars, 
  FaTimes,
  FaGlobe,
  FaDatabase,
  FaChartLine,
  FaCogs,
  FaLeaf,
  FaCube,
  FaServer,
  FaShieldAlt,
  FaDocker,
  FaGitAlt,
  FaLinux,
  FaCloud,
  FaChevronDown,
  FaUser,
  FaCode
} from "react-icons/fa";

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [typingText, setTypingText] = useState("");
  const isMobile = useIsMobile();
  const fullText = "Python & Java Developer";

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setTypingText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 100);

    return () => clearInterval(timer);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
    setMobileMenuOpen(false);
  };

  return (
    <div className="bg-custom-primary text-custom-text-primary overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-custom-primary/90 backdrop-blur-sm z-50 border-b border-custom-secondary">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="font-jetbrains font-bold text-xl text-custom-accent">
              &lt;Paxbolt/&gt;
            </div>
            
            <div className="hidden md:flex space-x-8">
              <button onClick={() => scrollToSection('home')} className="hover:text-custom-accent transition-colors duration-300">Home</button>
              <button onClick={() => scrollToSection('about')} className="hover:text-custom-accent transition-colors duration-300">About</button>
              <button onClick={() => scrollToSection('skills')} className="hover:text-custom-accent transition-colors duration-300">Skills</button>
              <button onClick={() => scrollToSection('projects')} className="hover:text-custom-accent transition-colors duration-300">Projects</button>
              <button onClick={() => scrollToSection('contact')} className="hover:text-custom-accent transition-colors duration-300">Contact</button>
            </div>
            
            <div className="md:hidden">
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-custom-text-primary hover:text-custom-accent"
              >
                {mobileMenuOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-custom-secondary border-t border-custom-secondary"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              <button onClick={() => scrollToSection('home')} className="block px-3 py-2 hover:text-custom-accent transition-colors duration-300 w-full text-left">Home</button>
              <button onClick={() => scrollToSection('about')} className="block px-3 py-2 hover:text-custom-accent transition-colors duration-300 w-full text-left">About</button>
              <button onClick={() => scrollToSection('skills')} className="block px-3 py-2 hover:text-custom-accent transition-colors duration-300 w-full text-left">Skills</button>
              <button onClick={() => scrollToSection('projects')} className="block px-3 py-2 hover:text-custom-accent transition-colors duration-300 w-full text-left">Projects</button>
              <button onClick={() => scrollToSection('contact')} className="block px-3 py-2 hover:text-custom-accent transition-colors duration-300 w-full text-left">Contact</button>
            </div>
          </motion.div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center hero-gradient relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-custom-primary/20 to-custom-primary"></div>
        
        <div className="text-center z-10 px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-4">
              <span className="text-custom-text-primary">Hello, I'm</span>
              <br />
              <motion.span 
                className="text-custom-accent"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                Paxbolt
              </motion.span>
            </h1>
            
            <div className="h-16 md:h-20 flex items-center justify-center mb-8">
              <p className="text-xl md:text-2xl lg:text-3xl font-jetbrains text-custom-text-secondary">
                <span className="inline-block overflow-hidden border-r-2 border-custom-accent whitespace-nowrap">
                  {typingText}
                </span>
              </p>
            </div>
            
            <p className="text-lg md:text-xl text-custom-text-muted max-w-2xl mx-auto mb-12 leading-relaxed">
              Crafting robust backend solutions and scalable applications with clean, efficient code.
              Passionate about solving complex problems through elegant programming.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.button
                onClick={() => scrollToSection('contact')}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-custom-accent to-custom-accent-hover px-8 py-4 rounded-full text-custom-primary font-semibold text-lg shadow-lg hover:shadow-custom-accent/30 transition-all duration-300"
              >
                <FaEnvelope className="inline mr-2" />
                Get In Touch
              </motion.button>
              <motion.button
                onClick={() => scrollToSection('about')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-custom-accent text-custom-accent px-8 py-4 rounded-full font-semibold text-lg hover:bg-custom-accent hover:text-custom-primary transition-all duration-300"
              >
                <FaUser className="inline mr-2" />
                Learn More
              </motion.button>
            </div>
          </motion.div>
        </div>
        
        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <FaChevronDown className="text-custom-accent text-2xl" />
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 lg:py-32 gradient-bg">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              About <span className="text-custom-accent">Paxbolt</span>
            </h2>
            <div className="w-24 h-1 bg-custom-accent mx-auto mb-8"></div>
            <p className="text-xl text-custom-text-secondary max-w-3xl mx-auto leading-relaxed">
              I'm a passionate developer specializing in Python and Java, dedicated to building 
              scalable applications and elegant solutions that make a difference.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl md:text-3xl font-bold mb-6 text-custom-accent">My Journey</h3>
              <div className="space-y-6 text-custom-text-secondary leading-relaxed">
                <p>
                  As a dedicated Python & Java developer, I bring a unique blend of analytical thinking 
                  and creative problem-solving to every project. My journey in software development 
                  has been driven by a passion for creating efficient, maintainable code that solves 
                  real-world challenges.
                </p>
                <p>
                  I specialize in backend development, API design, and system architecture, always 
                  striving to write clean, scalable code that stands the test of time. Whether it's 
                  building robust web applications or optimizing complex algorithms, I approach each 
                  challenge with enthusiasm and attention to detail.
                </p>
                <p>
                  When I'm not coding, you'll find me exploring new technologies, contributing to 
                  open-source projects, and sharing knowledge with the developer community.
                </p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <motion.div 
                whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(0, 212, 255, 0.1)" }}
                transition={{ duration: 0.3 }}
                className="bg-custom-secondary/50 rounded-2xl p-8"
              >
                <h3 className="text-2xl font-bold mb-6 text-custom-accent">What I Do</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-2 h-2 bg-custom-accent rounded-full mt-3 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-semibold text-custom-text-primary mb-2">Backend Development</h4>
                      <p className="text-custom-text-muted">Building robust server-side applications and APIs</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-2 h-2 bg-custom-accent rounded-full mt-3 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-semibold text-custom-text-primary mb-2">System Architecture</h4>
                      <p className="text-custom-text-muted">Designing scalable and maintainable software solutions</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-2 h-2 bg-custom-accent rounded-full mt-3 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-semibold text-custom-text-primary mb-2">Problem Solving</h4>
                      <p className="text-custom-text-muted">Tackling complex challenges with efficient algorithms</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 lg:py-32 bg-custom-primary">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Technical <span className="text-custom-accent">Skills</span>
            </h2>
            <div className="w-24 h-1 bg-custom-accent mx-auto mb-8"></div>
            <p className="text-xl text-custom-text-secondary max-w-3xl mx-auto">
              Specialized in Python and Java development with a focus on creating 
              efficient, scalable, and maintainable solutions.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-12">
            {/* Python Skills */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <motion.div 
                whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(0, 212, 255, 0.1)" }}
                transition={{ duration: 0.3 }}
                className="bg-custom-secondary/30 rounded-2xl p-8"
              >
                <div className="flex items-center mb-6">
                  <FaPython className="text-4xl text-custom-accent mr-4" />
                  <h3 className="text-2xl md:text-3xl font-bold">Python</h3>
                </div>
                <p className="text-custom-text-secondary mb-8 leading-relaxed">
                  Advanced Python development with expertise in web frameworks, data processing, 
                  and automation solutions.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <motion.div 
                    whileHover={{ borderColor: "var(--color-accent)", boxShadow: "0 0 20px rgba(0, 212, 255, 0.3)" }}
                    className="bg-custom-secondary/50 rounded-lg p-4 text-center border border-custom-accent/30 transition-all duration-300"
                  >
                    <FaGlobe className="text-custom-accent text-2xl mb-2 mx-auto" />
                    <div className="font-jetbrains text-sm">Django/Flask</div>
                  </motion.div>
                  <motion.div 
                    whileHover={{ borderColor: "var(--color-accent)", boxShadow: "0 0 20px rgba(0, 212, 255, 0.3)" }}
                    className="bg-custom-secondary/50 rounded-lg p-4 text-center border border-custom-accent/30 transition-all duration-300"
                  >
                    <FaDatabase className="text-custom-accent text-2xl mb-2 mx-auto" />
                    <div className="font-jetbrains text-sm">SQLAlchemy</div>
                  </motion.div>
                  <motion.div 
                    whileHover={{ borderColor: "var(--color-accent)", boxShadow: "0 0 20px rgba(0, 212, 255, 0.3)" }}
                    className="bg-custom-secondary/50 rounded-lg p-4 text-center border border-custom-accent/30 transition-all duration-300"
                  >
                    <FaChartLine className="text-custom-accent text-2xl mb-2 mx-auto" />
                    <div className="font-jetbrains text-sm">NumPy/Pandas</div>
                  </motion.div>
                  <motion.div 
                    whileHover={{ borderColor: "var(--color-accent)", boxShadow: "0 0 20px rgba(0, 212, 255, 0.3)" }}
                    className="bg-custom-secondary/50 rounded-lg p-4 text-center border border-custom-accent/30 transition-all duration-300"
                  >
                    <FaCogs className="text-custom-accent text-2xl mb-2 mx-auto" />
                    <div className="font-jetbrains text-sm">Automation</div>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
            
            {/* Java Skills */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <motion.div 
                whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(0, 212, 255, 0.1)" }}
                transition={{ duration: 0.3 }}
                className="bg-custom-secondary/30 rounded-2xl p-8"
              >
                <div className="flex items-center mb-6">
                  <FaJava className="text-4xl text-custom-accent mr-4" />
                  <h3 className="text-2xl md:text-3xl font-bold">Java</h3>
                </div>
                <p className="text-custom-text-secondary mb-8 leading-relaxed">
                  Enterprise-level Java development with focus on Spring ecosystem, 
                  microservices, and high-performance applications.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <motion.div 
                    whileHover={{ borderColor: "var(--color-accent)", boxShadow: "0 0 20px rgba(0, 212, 255, 0.3)" }}
                    className="bg-custom-secondary/50 rounded-lg p-4 text-center border border-custom-accent/30 transition-all duration-300"
                  >
                    <FaLeaf className="text-custom-accent text-2xl mb-2 mx-auto" />
                    <div className="font-jetbrains text-sm">Spring Boot</div>
                  </motion.div>
                  <motion.div 
                    whileHover={{ borderColor: "var(--color-accent)", boxShadow: "0 0 20px rgba(0, 212, 255, 0.3)" }}
                    className="bg-custom-secondary/50 rounded-lg p-4 text-center border border-custom-accent/30 transition-all duration-300"
                  >
                    <FaCube className="text-custom-accent text-2xl mb-2 mx-auto" />
                    <div className="font-jetbrains text-sm">Microservices</div>
                  </motion.div>
                  <motion.div 
                    whileHover={{ borderColor: "var(--color-accent)", boxShadow: "0 0 20px rgba(0, 212, 255, 0.3)" }}
                    className="bg-custom-secondary/50 rounded-lg p-4 text-center border border-custom-accent/30 transition-all duration-300"
                  >
                    <FaServer className="text-custom-accent text-2xl mb-2 mx-auto" />
                    <div className="font-jetbrains text-sm">REST APIs</div>
                  </motion.div>
                  <motion.div 
                    whileHover={{ borderColor: "var(--color-accent)", boxShadow: "0 0 20px rgba(0, 212, 255, 0.3)" }}
                    className="bg-custom-secondary/50 rounded-lg p-4 text-center border border-custom-accent/30 transition-all duration-300"
                  >
                    <FaShieldAlt className="text-custom-accent text-2xl mb-2 mx-auto" />
                    <div className="font-jetbrains text-sm">Security</div>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          </div>
          
          {/* Additional Technologies */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-16"
          >
            <h3 className="text-2xl font-bold text-center mb-8">Additional Technologies</h3>
            <div className="flex flex-wrap justify-center gap-4">
              {[
                { icon: FaDatabase, text: "PostgreSQL" },
                { icon: FaDatabase, text: "MongoDB" },
                { icon: FaDocker, text: "Docker" },
                { icon: FaGitAlt, text: "Git" },
                { icon: FaLinux, text: "Linux" },
                { icon: FaCloud, text: "AWS" }
              ].map((tech, index) => (
                <motion.span
                  key={tech.text}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{ borderColor: "var(--color-accent)", boxShadow: "0 0 20px rgba(0, 212, 255, 0.3)" }}
                  viewport={{ once: true }}
                  className="bg-custom-secondary/50 px-6 py-3 rounded-full font-jetbrains border border-custom-accent/30 transition-all duration-300"
                >
                  <tech.icon className="inline mr-2 text-custom-accent" />
                  {tech.text}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <ProjectsSection />

      {/* Contact Section */}
      <section id="contact" className="py-20 lg:py-32 gradient-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Let's <span className="text-custom-accent">Connect</span>
            </h2>
            <div className="w-24 h-1 bg-custom-accent mx-auto mb-8"></div>
            <p className="text-xl text-custom-text-secondary mb-12 max-w-2xl mx-auto leading-relaxed">
              Ready to collaborate on your next project? I'm always excited to work on 
              innovative solutions and tackle new challenges.
            </p>
            
            <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
              <motion.a
                href="mailto:contact@paxbolt.dev"
                whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(0, 212, 255, 0.1)" }}
                transition={{ duration: 0.3 }}
                className="group bg-custom-secondary/50 rounded-2xl p-8 text-center block"
              >
                <div className="w-16 h-16 bg-custom-accent/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-custom-accent/30 transition-colors duration-300">
                  <FaEnvelope className="text-custom-accent text-2xl" />
                </div>
                <h3 className="text-xl font-bold mb-2">Email Me</h3>
                <p className="text-custom-text-muted font-jetbrains">contact@paxbolt.dev</p>
                <div className="mt-4 text-custom-accent font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Send Message →
                </div>
              </motion.a>
              
              <motion.a
                href="https://github.com/paxbolt"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(0, 212, 255, 0.1)" }}
                transition={{ duration: 0.3 }}
                className="group bg-custom-secondary/50 rounded-2xl p-8 text-center block"
              >
                <div className="w-16 h-16 bg-custom-accent/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-custom-accent/30 transition-colors duration-300">
                  <FaGithub className="text-custom-accent text-2xl" />
                </div>
                <h3 className="text-xl font-bold mb-2">GitHub</h3>
                <p className="text-custom-text-muted font-jetbrains">@paxbolt</p>
                <div className="mt-4 text-custom-accent font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  View Profile →
                </div>
              </motion.a>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="mt-12 p-8 bg-custom-secondary/30 rounded-2xl"
            >
              <h3 className="text-2xl font-bold mb-4">Available for</h3>
              <div className="flex flex-wrap justify-center gap-4">
                {[
                  "Backend Development",
                  "API Design", 
                  "System Architecture",
                  "Code Review",
                  "Consulting"
                ].map((service, index) => (
                  <motion.span
                    key={service}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-custom-accent/20 text-custom-accent px-4 py-2 rounded-full font-jetbrains text-sm"
                  >
                    {service}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-custom-primary border-t border-custom-secondary">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="font-jetbrains font-bold text-2xl text-custom-accent mb-4">
              &lt;Paxbolt/&gt;
            </div>
            <p className="text-custom-text-muted mb-6">
              Python & Java Developer • Building the future, one line of code at a time
            </p>
            <div className="flex justify-center space-x-6 mb-6">
              <a 
                href="mailto:contact@paxbolt.dev"
                className="text-custom-text-muted hover:text-custom-accent transition-colors duration-300"
              >
                <FaEnvelope className="text-xl" />
              </a>
              <a 
                href="https://github.com/paxbolt"
                target="_blank"
                rel="noopener noreferrer"
                className="text-custom-text-muted hover:text-custom-accent transition-colors duration-300"
              >
                <FaGithub className="text-xl" />
              </a>
            </div>
            <p className="text-custom-text-muted text-sm">
              © 2024 Paxbolt. Crafted with passion and code.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
