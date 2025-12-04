'use client'

import { motion } from 'motion/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faBullseye, 
  faRocket, 
  faUsers,
  faLightbulb
} from '@fortawesome/free-solid-svg-icons'

export function AboutSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.div 
            className="flex flex-col items-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <FontAwesomeIcon 
              icon={faLightbulb} 
              className="text-4xl text-yellow-400 mb-4" 
            />
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-10">
              About NST SDC
            </h2>
          </motion.div>
          <motion.p 
            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Welcome to the official hub of NST ADYPU's Student Developer Club, where innovation meets collaboration. 
            We're a community of passionate students dedicated to exploring the world of technology and software development.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-16">
          {[
            {
              title: 'Our Aim',
              description: 'To foster a culture of innovation and technical excellence among students, providing them with the tools and knowledge to build the future.',
              icon: faBullseye,
              iconColor: 'text-red-500'
            },
            {
              title: 'Our Activities',
              description: 'From hackathons and workshops to coding competitions and networking events, we create opportunities for students to learn, build, and grow together.',
              icon: faRocket,
              iconColor: 'text-blue-500'
            },
            {
              title: 'Join Us',
              description: 'Whether you\'re a beginner or an experienced developer, there\'s a place for you in our community. Come build amazing projects with us!',
              icon: faUsers,
              iconColor: 'text-green-500'
            }
          ].map((item, index) => (
            <motion.div
              key={item.title}
              className="bg-gray-50 dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
            >
              <div className={`text-4xl mb-4 ${item.iconColor}`}>
                <FontAwesomeIcon icon={item.icon} className="h-10 w-10" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">{item.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
