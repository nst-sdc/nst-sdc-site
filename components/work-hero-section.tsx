'use client'

import { motion } from 'motion/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faLightbulb, 
  faLaptopCode, 
  faHandshake,
  faMicrophone,
  faGlobe,
  faChartLine,
  faRocket
} from '@fortawesome/free-solid-svg-icons'

export function FeaturesSection() {
  const features = [
    {
      title: 'Workshops',
      description: 'Hands-on sessions on the latest technologies and development practices.',
      icon: faLightbulb,
      iconColor: 'text-yellow-500'
    },
    {
      title: 'Hackathons',
      description: 'Compete and collaborate in exciting coding marathons to build innovative solutions.',
      icon: faLaptopCode,
      iconColor: 'text-blue-500'
    },
    {
      title: 'Projects',
      description: 'Work on real-world projects with fellow developers and industry experts.',
      icon: faHandshake,
      iconColor: 'text-green-500'
    },
    {
      title: 'Master Classes',
      description: 'Learn from industry leaders and experienced developers.',
      icon: faMicrophone,
      iconColor: 'text-purple-500'
    },
    {
      title: 'Networking',
      description: 'Connect with like-minded developers and potential collaborators.',
      icon: faGlobe,
      iconColor: 'text-indigo-500'
    },
    {
      title: 'Expert Guidance',
      description: 'Get guidance on internships, jobs, and career development in tech.',
      icon: faChartLine,
      iconColor: 'text-red-500'
    }
  ]

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-black">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col items-center">
            <FontAwesomeIcon 
              icon={faRocket} 
              className="text-4xl text-blue-500 mb-4" 
            />
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-10">
              What We Do
            </h2>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Join us to explore a world of opportunities in software development and technology.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-gray-800"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <div className={`text-4xl mb-4 ${feature.iconColor}`}>
                <FontAwesomeIcon icon={feature.icon} className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
