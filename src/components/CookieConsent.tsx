import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
  Switch,
  Linking,
  Platform,
  Dimensions,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Cookie preferences type
interface CookiePreferences {
  necessary: boolean;
  functional: boolean;
  analytics: boolean;
  marketing: boolean;
}

// Add these properties to customize the appearance
interface CookieConsentProps {
  primaryColor?: string;
  policyUrl?: string;
  onAcceptAll?: (preferences: CookiePreferences) => void;
  onSavePreferences?: (preferences: CookiePreferences) => void;
}

const CookieConsent: React.FC<CookieConsentProps> = ({
  primaryColor = '#d4af37', // Default gold color for luxury hotel look
  policyUrl = 'https://yourhotel.com/cookies-policy',
  onAcceptAll,
  onSavePreferences,
}) => {
  const [showBanner, setShowBanner] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true, // Always true
    functional: true,
    analytics: true,
    marketing: true,
  });

  // Check for existing cookie consent when component mounts
  useEffect(() => {
    const checkConsentStatus = async () => {
      try {
        const storedConsent = await AsyncStorage.getItem('cookieConsent');
        if (storedConsent) {
          // If consent exists, don't show banner
          if (storedConsent !== 'all') {
            // If it's not "all", it's a JSON string with preferences
            const savedPreferences = JSON.parse(storedConsent);
            setPreferences(savedPreferences);
          }
        } else {
          // No consent found, show banner
          setShowBanner(true);
        }
      } catch (error) {
        console.error('Error reading cookie consent:', error);
        setShowBanner(true); // Show banner on error
      }
    };

    checkConsentStatus();
  }, []);

  // Handle accept all cookies
  const handleAcceptAll = async () => {
    const allPreferences = {
      necessary: true,
      functional: true,
      analytics: true,
      marketing: true,
    };
    
    try {
      await AsyncStorage.setItem('cookieConsent', 'all');
      setPreferences(allPreferences);
      setShowBanner(false);
      
      // Call the callback if provided
      if (onAcceptAll) {
        onAcceptAll(allPreferences);
      }
    } catch (error) {
      console.error('Error saving cookie consent:', error);
    }
  };

  // Handle saving preferences
  const handleSavePreferences = async () => {
    try {
      await AsyncStorage.setItem('cookieConsent', JSON.stringify(preferences));
      setShowBanner(false);
      setShowModal(false);
      
      // Call the callback if provided
      if (onSavePreferences) {
        onSavePreferences(preferences);
      }
    } catch (error) {
      console.error('Error saving cookie preferences:', error);
    }
  };

  // Open cookies policy
  const openCookiesPolicy = () => {
    Linking.openURL(policyUrl);
  };

  // If banner shouldn't be shown, return null
  if (!showBanner) return null;

  return (
    <>
      {/* Cookie Consent Banner */}
      <View style={styles.bannerContainer}>
        <View style={styles.bannerContent}>
          <Text style={styles.bannerTitle}>Our website uses cookies</Text>
          
          <Text style={styles.bannerText}>
            We use cookies on this site to enable site functionality, ensure secure site operation, 
            enhance your user experience, and personalise content and advertisements. 
            By clicking 'Accept All', you agree to our use of cookies.
          </Text>
          
          <Text style={styles.bannerText}>
            You can manage your cookie preferences at any time by clicking on 'Manage Cookies'. 
            For more information about how we use cookies and how you can change cookies settings, 
            please see our{' '}
            <Text style={[styles.linkText, { color: primaryColor }]} onPress={openCookiesPolicy}>
              Cookies Policy
            </Text>
            .
          </Text>
          
          <View style={styles.buttonRow}>
            <TouchableOpacity 
              style={[styles.button, styles.manageButton]} 
              onPress={() => setShowModal(true)}
            >
              <Text style={styles.buttonText}>Manage Cookies</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.button, styles.acceptButton, { backgroundColor: primaryColor }]} 
              onPress={handleAcceptAll}
            >
              <Text style={styles.acceptButtonText}>Accept All</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Cookie Preferences Modal */}
      <Modal
        visible={showModal}
        transparent={true}
        animationType="fade"
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <ScrollView contentContainerStyle={styles.modalContent}>
              <Text style={styles.modalTitle}>Cookie Preferences</Text>
              
              {/* Necessary Cookies */}
              <View style={styles.cookieCategory}>
                <View style={styles.categoryHeader}>
                  <Text style={styles.categoryTitle}>Necessary Cookies</Text>
                  <View style={styles.toggleWrapper}>
                    <Text style={styles.toggleLabel}>Always Active</Text>
                    <Switch
                      value={true}
                      disabled={true}
                      trackColor={{ false: '#ccc', true: primaryColor }}
                    />
                  </View>
                </View>
                <Text style={styles.categoryDescription}>
                  These cookies are essential for the website to function properly. They enable basic 
                  functions like page navigation, access to secure areas, and booking functionality. 
                  The website cannot function properly without these cookies.
                </Text>
              </View>
              
              {/* Functional Cookies */}
              <View style={styles.cookieCategory}>
                <View style={styles.categoryHeader}>
                  <Text style={styles.categoryTitle}>Functional Cookies</Text>
                  <Switch
                    value={preferences.functional}
                    onValueChange={(value) => 
                      setPreferences({ ...preferences, functional: value })
                    }
                    trackColor={{ false: '#ccc', true: primaryColor }}
                  />
                </View>
                <Text style={styles.categoryDescription}>
                  These cookies enable enhanced functionality and personalization, such as remembering 
                  your preferences, language choices, and room selections for future visits.
                </Text>
              </View>
              
              {/* Analytics Cookies */}
              <View style={styles.cookieCategory}>
                <View style={styles.categoryHeader}>
                  <Text style={styles.categoryTitle}>Analytics Cookies</Text>
                  <Switch
                    value={preferences.analytics}
                    onValueChange={(value) => 
                      setPreferences({ ...preferences, analytics: value })
                    }
                    trackColor={{ false: '#ccc', true: primaryColor }}
                  />
                </View>
                <Text style={styles.categoryDescription}>
                  These cookies collect information about how visitors use our website, which pages are 
                  visited most often, and if they experience any errors. All information collected is 
                  anonymous and helps us improve our website.
                </Text>
              </View>
              
              {/* Marketing Cookies */}
              <View style={styles.cookieCategory}>
                <View style={styles.categoryHeader}>
                  <Text style={styles.categoryTitle}>Marketing Cookies</Text>
                  <Switch
                    value={preferences.marketing}
                    onValueChange={(value) => 
                      setPreferences({ ...preferences, marketing: value })
                    }
                    trackColor={{ false: '#ccc', true: primaryColor }}
                  />
                </View>
                <Text style={styles.categoryDescription}>
                  These cookies are used to display relevant advertisements and promotions based on your 
                  interests, both on our website and on third-party websites. They also measure the 
                  effectiveness of advertising campaigns.
                </Text>
              </View>
              
              {/* Modal Footer */}
              <View style={styles.modalFooter}>
                <TouchableOpacity 
                  style={[styles.button, styles.manageButton]} 
                  onPress={() => setShowModal(false)}
                >
                  <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={[styles.button, styles.acceptButton, { backgroundColor: primaryColor }]} 
                  onPress={handleSavePreferences}
                >
                  <Text style={styles.acceptButtonText}>Save Preferences</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  bannerContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    zIndex: 1000,
  },
  bannerContent: {
    padding: 20,
  },
  bannerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  bannerText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
    lineHeight: 20,
  },
  linkText: {
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 15,
    gap: 10,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  manageButton: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  acceptButton: {
    backgroundColor: '#d4af37', // Default color (can be overridden by props)
  },
  buttonText: {
    color: '#333',
    fontSize: 14,
    fontWeight: '500',
  },
  acceptButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
  
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    width: '100%',
    maxWidth: 600,
    maxHeight: Dimensions.get('window').height * 0.8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalContent: {
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 15,
  },
  cookieCategory: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 15,
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  toggleWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  toggleLabel: {
    marginRight: 10,
    fontSize: 12,
    color: '#666',
  },
  categoryDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  modalFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 20,
    gap: 10,
  },
});

export default CookieConsent;