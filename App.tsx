import React, { useEffect, useRef, useState } from 'react';
import { BackHandler } from 'react-native';
import { WebView } from 'react-native-webview';

const App = () => {
  const webViewRef = useRef<WebView | null>(null);
  const [canGoBack, setCanGoBack] = useState(false); // State to track if we can go back

  const handleBackPress = () => {
    if (canGoBack) {
      // Go back in the WebView's history
      webViewRef.current?.goBack();
      return true; // Prevent default back button behavior
    }
    return false; // Allow the default back button behavior (exit app)
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackPress);

    // Clean up the event listener on unmount
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
    };
  }, [canGoBack]); // Dependency array includes canGoBack

  return (
    <WebView
      ref={webViewRef}
      source={{ uri: 'http://barangaysystem.com' }}
      style={{ marginTop: 20 }}
      onNavigationStateChange={(navState) => {
        // Update the canGoBack state based on navigation state
        setCanGoBack(navState.canGoBack);
      }}
    />
  );
};

export default App;
