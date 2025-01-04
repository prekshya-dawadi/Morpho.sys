import React from 'react';
import { Document, Page, Text, View, StyleSheet, PDFViewer } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'Times-Roman'
  },
  mainTitle: {
    fontSize: 24,
    marginBottom: 20,
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
    lineHeight: 1.5
  },
  checklistItem: {
    marginLeft: 48,
    marginBottom: 8,
    fontSize: 12
  },
  subChecklistContainer: {
    marginLeft: 72,
    marginBottom: 4
  },
  subChecklistNumber: {
    marginBottom: 4,
    fontSize: 12
  }
});

const ChecklistNumbers = ({ components }) => (
  <View style={styles.subChecklistContainer}>
    {components.map((component, index) => (
      <Text key={index} style={styles.subChecklistNumber}>
        {component.checklistno}
      </Text>
    ))}
  </View>
);

const Section = ({ sectionNumber, title, paragraphs, checklist }) => (
  <View style={styles.sectionContainer}>
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionNumber}>{sectionNumber}</Text>
      <Text style={styles.sectionTitle}>{title}</Text>
    </View>
    
    {paragraphs && paragraphs.map((p, index) => (
      <Text key={index} style={styles.paragraph}>
        {p.paragraph}
      </Text>
    ))}
    
    {checklist && checklist.map((item, index) => (
      <View key={index}>
        <Text style={styles.checklistItem}>{item.sentence}</Text>
        <ChecklistNumbers components={item.checklistcomponent} />
      </View>
    ))}
  </View>
);

const MainSection = ({ sectionparagraph, checklist }) => (
  <Section
    sectionNumber="1"
    title="Introduction"
    paragraphs={sectionparagraph}
    checklist={checklist}
  />
);

const PDFContent = ({ proposal }) => {
  if (!proposal) return null;

  return (
    <PDFViewer style={{ width: '100%', height: '100%' }}>
      <Document>
        <Page size="A4" style={styles.page}>
          <Text style={styles.mainTitle}>{proposal.title}</Text>
          
          {/* Main Section */}
          <MainSection 
            sectionparagraph={proposal.sectionparagraph}
            checklist={proposal.checklist}
          />
          
          {/* Subsections */}
          {proposal.subsections && proposal.subsections.map((subsection, index) => (
            <Section
              key={index}
              sectionNumber={`${index + 2}`}
              title={subsection.title}
              paragraphs={subsection.paragraph}
              checklist={subsection.checklist}
            />
          ))}
        </Page>
      </Document>
    </PDFViewer>
  );
};

export default PDFContent;