import { useEffect, useState } from 'react'
import LatestPosts from '../../components/LatestPosts/LatestPosts'
import GetInTouch from '../../components/GetInTouch/GetInTouch'
import Carousel from '../../components/Carousel/Carousel'
import SchemaForm from '../../components/SchemaForm/SchemaForm'
import { JsonSchema, UISchemaElement } from '@jsonforms/core'
import { UserList } from '../../components/UsersList'
import styles from './HomePage.module.css'


interface Slide {
  date: string | Date | number;
  id: number;
  title: string;
  excerpt: string;
  cover_image: string;
  url: string;
  autoslide: boolean;
  interval?: number;
  slug: string;

}

// 1. Define or fetch the layout & structures (zero code changes needed here when modified)
const dataSchema: JsonSchema = {
  type: 'object',
  properties: {
    connectionName: { type: 'string', title: 'Connection Name', minLength: 3 },
    endpointUrl: { type: 'string', title: 'Endpoint URL', format: 'uri' },
    environment: { type: 'string', enum: ['Development', 'Staging', 'Production'] }
  },
  required: ['connectionName', 'endpointUrl']
};

const uiSchema: UISchemaElement = {
  type: 'VerticalLayout',
  elements: [
    { type: 'Control', scope: '#/properties/connectionName' },
    { type: 'Control', scope: '#/properties/endpointUrl' },
    { type: 'Control', scope: '#/properties/environment' }
  ]
};
const HomePage = () => {
  const [slides, setSlides] = useState<Slide[]>([])

  const [loading, setLoading] = useState<boolean>(true)

  // Fetch the latest posts at the page level
  useEffect(() => {
    fetch("/api/posts")
      .then((r) => r.json())
      .then((data: Slide[]) => {
        setSlides(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  // Slice the 5 most recent posts specifically for the carousel header
  const carouselSlide = slides.slice(0, 5)
  if (loading) {
    return <div className={styles.loading}>Loading content...</div>
  };   const handleFormSubmit = (finalData: unknown) => {
    console.log('Sending type-safe payload to backend:', finalData);
    // Execute API mutations, state updates, or automated workflows here
  };
  return (
    <main className={styles.contentContainer}> 
    <div className={styles.carouselContainer}>
     
      <Carousel slides={carouselSlide} autoSlide={true} interval={5000}/>
      
         
      
    </div>
      <section className={styles.section}>
        <div className={styles.latestPosts}>
          <LatestPosts/>
        </div>
              <SchemaForm
            schema={dataSchema}
            uiSchema={uiSchema}
            onSubmit={handleFormSubmit}
          />
<UserList />
        <div className={styles.getInTouch}>
          <GetInTouch
            {...{
              leftColumn: (
                <div>
                </div>
              ),
              rightColumn: (
                <div>
                </div>
              ),
            }

            }
          /></div>
      </section>
    </main>
  );
}

export default HomePage;