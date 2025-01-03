import React from 'react';
import { Document, Page, Text, View, StyleSheet, PDFViewer } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 30
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold'
  },
  section: {
    marginBottom: 20
  },
  heading: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: 'bold'
  },
  text: {
    fontSize: 12,
    lineHeight: 1.5
  }
});

const PDFContent = ({ proposal }) => {
  if (!proposal) return null;

  return (
    <PDFViewer style={{ width: '100%', height: '100%' }}>
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.title}>
            <Text>{proposal.title || 'New Proposal'}</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.text}>Type: {proposal.type || 'Draft'}</Text>
            <Text style={styles.text}>Status: {proposal.status || 'In Progress'}</Text>
          </View>
          {proposal.sections?.map((section, index) => (
            <View key={index} style={styles.section}>
              <Text style={styles.heading}>{section.title}</Text>
              <Text style={styles.text}>{section.content}</Text>
            </View>
          ))}
        </Page>
      </Document>
    </PDFViewer>
  );
};

export default PDFContent;