import React from 'react';
import { Document, Page, Text, View, StyleSheet, PDFViewer, Image } from '@react-pdf/renderer';
import { Font } from '@react-pdf/renderer';

// Register fonts if needed
Font.register({
  family: 'Times-Roman',
  src: 'https://fonts.gstatic.com/s/timesnewroman/v18/cJZKeOu2e3yrRYtoo4WAfA.ttf'
});

// Create styles
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'Times-Roman'
  },
  mainTitle: {
    fontSize: 24,
    marginBottom: 30,
    textAlign: 'center',
    fontFamily: 'Times-Bold'
  },
  sectionContainer: {
    marginBottom: 20
  },
  sectionHeader: {
    flexDirection: 'row',
    marginBottom: 12
  },
  sectionNumber: {
    width: 24,
    fontSize: 16,
    fontFamily: 'Times-Bold'
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Times-Bold'
  },
  paragraph: {
    marginLeft: 24,
    fontSize: 12,
    marginBottom: 8,
    lineHeight: 1.5,
    textAlign: 'justify'
  },
  bulletContainer: {
    marginLeft: 48,
    marginTop: 8,
    marginBottom: 8
  },
  bulletPoint: {
    flexDirection: 'row',
    marginBottom: 4
  },
  bullet: {
    width: 15,
    fontSize: 12
  },
  bulletText: {
    fontSize: 12,
    flex: 1
  },
  // Updated image styles
  headerImage: {
    marginHorizontal: 'auto',
    marginBottom: 20,
    width: '90%',
    height: 'auto',
    maxHeight: 200
  },
  sectionImage: {
    marginLeft: 24,
    marginBottom: 12,
    width: '80%',
    height: 'auto',
    maxHeight: 150
  }
});

const BulletPoints = ({ points }) => (
  <View style={styles.bulletContainer}>
    {points.map((point, index) => (
      <View key={index} style={styles.bulletPoint}>
        <Text style={styles.bullet}>•</Text>
        <Text style={styles.bulletText}>{point}</Text>
      </View>
    ))}
  </View>
);

const Section = ({ sectionNumber, title, paragraphs, bulletpoints, image }) => (
  <View style={styles.sectionContainer}>
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionNumber}>{sectionNumber}</Text>
      <Text style={styles.sectionTitle}>{title}</Text>
    </View>
    {image && (
      <View>
        <Image
          src={image}
          style={styles.sectionImage}
          cache={false}
        />
      </View>
    )}
    {paragraphs && paragraphs.map((p, index) => (
      <Text key={index} style={styles.paragraph}>
        {p}
      </Text>
    ))}
    {bulletpoints && <BulletPoints points={bulletpoints} />}
  </View>
);

const PDFContent = ({ proposal }) => {
  if (!proposal) return null;

  // Ensure the images are accessible URLs or imported files
  const ensureValidImageUrl = (url) => {
    if (!url) return null;
    try {
      // Return the URL if it's valid
      new URL(url);
      return url;
    } catch {
      // If it's a local path, you might need to import it or use a complete URL
      return process.env.PUBLIC_URL + url;
    }
  };
  
  return (
    <PDFViewer style={{ width: '100%', height: '100%' }}>
      <Document>
        <Page size="A4" style={styles.page}>
          <Text style={styles.mainTitle}>{proposal.title}</Text>
          {proposal.headerImage && (
            <Image
              src={ensureValidImageUrl(proposal.headerImage)}
              style={styles.headerImage}
              cache={false}
            />
          )}
          {proposal.sections.map((section, index) => (
            <Section
              key={index}
              sectionNumber={`${index + 1}`}
              title={section.title}
              paragraphs={section.paragraph}
              bulletpoints={section.bulletpoint}
              image={ensureValidImageUrl(section.image)}
            />
          ))}
        </Page>
      </Document>
    </PDFViewer>
  );
};

export default PDFContent;