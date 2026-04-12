import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Animated,
  useWindowDimensions,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { useAuth } from '../contexts/AuthContext';
import { urlAPI } from '../services/api';
import { Colors, Spacing, FontSizes, BorderRadius, Shadows } from '../constants/theme';
import { TOOLS_CATEGORIES } from '../constants/tools';
import AnimatedCounter from '../components/ui/AnimatedCounter';


export default function HomePage() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  const isTablet = width >= 768 && width < 1024;

  const [url, setUrl] = useState('');
  const [shortenedUrl, setShortenedUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  // Animations
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const resultAnim = useRef(new Animated.Value(0)).current;
  const backToTopAnim = useRef(new Animated.Value(0)).current;

  const scrollRef = useRef(null);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const sectionPositions = useRef({});

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();

    // Pulse animation for CTA
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1.02, duration: 2000, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 1, duration: 2000, useNativeDriver: true }),
      ])
    );
    pulse.start();
    return () => pulse.stop();
  }, []);

  const handleScroll = (event) => {
    const y = event.nativeEvent.contentOffset.y;
    if (y > 600 && !showBackToTop) {
      setShowBackToTop(true);
      Animated.spring(backToTopAnim, { toValue: 1, useNativeDriver: true }).start();
    } else if (y <= 600 && showBackToTop) {
      setShowBackToTop(false);
      Animated.timing(backToTopAnim, { toValue: 0, duration: 200, useNativeDriver: true }).start();
    }
  };

  const scrollToTop = () => {
    scrollRef.current?.scrollTo({ y: 0, animated: true });
  };

  const scrollToCategory = (categoryName) => {
    const y = sectionPositions.current[categoryName];
    if (y !== undefined) {
      scrollRef.current?.scrollTo({ y: y - 80, animated: true });
    }
  };

  const handleShrink = async () => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    if (!url.trim()) {
      setError('Please enter a URL');
      return;
    }

    // Add protocol if missing
    let finalUrl = url.trim();
    if (!finalUrl.startsWith('http://') && !finalUrl.startsWith('https://')) {
      finalUrl = 'https://' + finalUrl;
    }

    setIsLoading(true);
    setError('');
    setShortenedUrl('');

    try {
      const response = await urlAPI.create({ originalUrl: finalUrl });
      setShortenedUrl(response.data.url.shortUrl);
      Animated.spring(resultAnim, {
        toValue: 1,
        friction: 6,
        useNativeDriver: true,
      }).start();
    } catch (err) {
      setError(err.message || 'Failed to shorten URL');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async () => {
    if (Platform.OS === 'web') {
      await navigator.clipboard.writeText(shortenedUrl);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const features = [
    {
      icon: 'analytics-outline',
      title: 'Powerful Analytics',
      desc: 'Track clicks, devices, browsers, and geographic data in real-time.',
      color: Colors.accent,
    },
    {
      icon: 'flash-outline',
      title: 'Lightning Fast',
      desc: 'Instant redirects with global CDN. Your links never slow down.',
      color: Colors.success,
    },
    {
      icon: 'shield-checkmark-outline',
      title: 'Secure & Reliable',
      desc: '99.9% uptime with enterprise-grade security for your links.',
      color: Colors.primary,
    },
    {
      icon: 'qr-code-outline',
      title: 'QR Codes',
      desc: 'Generate beautiful QR codes for every shortened link instantly.',
      color: '#EC4899',
    },
    {
      icon: 'globe-outline',
      title: 'Custom Domains',
      desc: 'Use your own domain for branded short links and full control.',
      color: '#14B8A6',
    },
  ];

  const stats = [
    { value: '10M+', label: 'Links Shortened' },
    { value: '5M+', label: 'Images Processed' },
    { value: '150K+', label: 'Happy Users' },
    { value: '99.9%', label: 'Uptime' },
  ];


  return (
    <View style={styles.wrapper}>
      <Header />
      <ScrollView
        ref={scrollRef}
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={handleScroll}
      >
        {/* Hero Section */}
        <LinearGradient
          colors={Colors.gradientHero}
          style={styles.heroSection}
        >
          {/* Decorative orbs */}
          <View style={[styles.orb, styles.orbPurple]} />
          <View style={[styles.orb, styles.orbBlue]} />

          <Animated.View
            style={[
              styles.heroContent,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
              isMobile && styles.heroContentMobile,
            ]}
          >
            <View style={styles.badge}>
              <Ionicons name="sparkles" size={14} color={Colors.primary} />
              <Text style={styles.badgeText}>Unified Link & Image Workspace</Text>
            </View>

            <Text style={[styles.heroTitle, isMobile && styles.heroTitleMobile]}>
              Your All-in-One{'\n'}
              <Text style={styles.heroTitleGradient}>Digital Toolbox</Text>
            </Text>

            <Text style={[styles.heroSubtitle, isMobile && styles.heroSubtitleMobile]}>
              Shrink links with deep analytics, isolate subjects with High-Fidelity AI, 
              and master 13+ free image tools. Everything you need to manage your digital assets.
            </Text>


            {/* Primary Action: URL Shortener */}
            {!shortenedUrl && !error && (
              <View style={[styles.mainActionContainer, isMobile && styles.mainActionContainerMobile]}>
                <View style={[styles.urlInputContainer, isMobile && styles.urlInputContainerMobile]}>
                  <View style={[styles.urlInputWrapper, isMobile && styles.urlInputWrapperMobile]}>
                    <Ionicons name="link-outline" size={22} color={Colors.textMuted} style={styles.urlIcon} />
                    <TextInput
                      value={url}
                      onChangeText={(text) => { setUrl(text); setError(''); }}
                      placeholder="Paste your long link to shrink..."
                      placeholderTextColor={Colors.textMuted}
                      style={[styles.urlInput, isMobile && styles.urlInputMobile]}
                      onSubmitEditing={handleShrink}
                    />
                    {!isMobile && (
                      <TouchableOpacity onPress={handleShrink} disabled={isLoading}>
                        <LinearGradient
                          colors={Colors.gradientPrimary}
                          style={styles.shrinkButton}
                        >
                          <Text style={styles.shrinkButtonText}>{isLoading ? '...' : 'Shrink Now'}</Text>
                        </LinearGradient>
                      </TouchableOpacity>
                    )}
                  </View>
                  {isMobile && (
                    <Button
                      title={isLoading ? 'Shrinking...' : 'Shrink It!'}
                      onPress={handleShrink}
                      loading={isLoading}
                      fullWidth
                      style={{ marginTop: Spacing.sm }}
                    />
                  )}
                </View>

                {/* Featured Bento Grid */}
                <View style={[styles.bentoContainer, isMobile && styles.bentoContainerMobile]}>
                  {/* Big Hero Tool */}
                  <TouchableOpacity onPress={() => router.push('/tools/remove-background')} style={[styles.bentoMain, isMobile && styles.bentoMainMobile, { borderColor: '#8B5CF6' + '40' }]}>
                    <LinearGradient colors={[Colors.bgCard, Colors.bgSecondary]} style={styles.bentoGradientBg} />
                    <View style={[styles.bentoMainGlow, { backgroundColor: '#8B5CF6' + '20' }]} />
                    <View style={[styles.badgePro, { backgroundColor: '#8B5CF6' }]}><Text style={styles.badgeProText}>✨ Pro</Text></View>
                    <View style={styles.bentoMainIconLayer}>
                      <Ionicons name="cut" size={56} color="#8B5CF6" />
                    </View>
                    <Text style={styles.bentoMainTitle}>Background Removal</Text>
                    <Text style={styles.bentoMainDesc}>High-fidelity AI subject isolation. Remove backgrounds from any image instantly in your browser.</Text>
                  </TouchableOpacity>

                  {/* Side Small Tools */}
                  <View style={[styles.bentoSideGrid, isMobile && styles.bentoSideGridMobile]}>
                    <TouchableOpacity onPress={() => router.push('/tools/compress')} style={styles.bentoSm}>
                      <LinearGradient colors={[Colors.bgCard, Colors.bgSecondary]} style={styles.bentoGradientBg} />
                      <Ionicons name="contract" size={28} color="#EC4899" style={styles.bentoSmIcon} />
                      <View>
                        <Text style={styles.bentoSmTitle}>Compress Image</Text>
                        <Text style={styles.bentoSmDesc} numberOfLines={1}>Keep quality, reduce size</Text>
                      </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => router.push('/tools/meme-generator')} style={styles.bentoSm}>
                       <LinearGradient colors={[Colors.bgCard, Colors.bgSecondary]} style={styles.bentoGradientBg} />
                       <Ionicons name="happy" size={28} color="#F59E0B" style={styles.bentoSmIcon} />
                       <View>
                         <Text style={styles.bentoSmTitle}>Meme Generator</Text>
                         <Text style={styles.bentoSmDesc} numberOfLines={1}>Viral meme formats</Text>
                       </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => router.push('/tools/html-to-image')} style={styles.bentoSm}>
                       <LinearGradient colors={[Colors.bgCard, Colors.bgSecondary]} style={styles.bentoGradientBg} />
                       <Ionicons name="code-slash" size={28} color="#14B8A6" style={styles.bentoSmIcon} />
                       <View>
                         <Text style={styles.bentoSmTitle}>HTML to Image</Text>
                         <Text style={styles.bentoSmDesc} numberOfLines={1}>Beautiful code snippets</Text>
                       </View>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )}



            {error ? (
              <View style={styles.errorContainer}>
                <Ionicons name="alert-circle" size={16} color={Colors.error} />
                <Text style={styles.errorText}>{error}</Text>
              </View>
            ) : null}

            {/* Shortened URL Result */}
            {shortenedUrl ? (
              <Animated.View
                style={[
                  styles.resultContainer,
                  {
                    opacity: resultAnim,
                    transform: [
                      {
                        translateY: resultAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: [20, 0],
                        }),
                      },
                    ],
                  },
                ]}
              >
                <View style={styles.resultContent}>
                  <Ionicons name="checkmark-circle" size={20} color={Colors.success} />
                  <Text style={styles.resultUrl} numberOfLines={1}>{shortenedUrl}</Text>
                  <TouchableOpacity onPress={handleCopy} style={styles.copyButton}>
                    <LinearGradient
                      colors={copied ? [Colors.success, Colors.success] : Colors.gradientPrimary}
                      style={styles.copyButtonInner}
                    >
                      <Ionicons
                        name={copied ? 'checkmark' : 'copy-outline'}
                        size={16}
                        color="#fff"
                      />
                      <Text style={styles.copyButtonText}>
                        {copied ? 'Copied!' : 'Copy'}
                      </Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              </Animated.View>
            ) : null}

            {!isAuthenticated && (
              <Text style={styles.heroHint}>
                <Ionicons name="information-circle-outline" size={14} color={Colors.textMuted} />
                {'  '}Sign in to start shortening URLs and access your dashboard
              </Text>
            )}
          </Animated.View>
        </LinearGradient>

        {/* Back to Top Floating Button */}
        {showBackToTop && (
          <Animated.View style={[
            styles.backToTop,
            { 
              opacity: backToTopAnim,
              transform: [{ scale: backToTopAnim }]
            }
          ]}>
            <TouchableOpacity onPress={scrollToTop} style={styles.backToTopInner}>
              <Ionicons name="arrow-up" size={24} color="#fff" />
            </TouchableOpacity>
          </Animated.View>
        )}



        {/* Stats Section */}
        <View style={styles.statsSection}>
          <View style={[styles.statsGrid, isMobile && styles.statsGridMobile]}>
            {stats.map((stat, index) => (
              <View key={index} style={[styles.statItem, isMobile && styles.statItemMobile]}>
                <AnimatedCounter value={stat.value} style={styles.statValue} />
                <Text style={styles.statLabel}>{stat.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Features Section */}
        <View style={styles.featuresSection}>
          <Text style={[styles.sectionTitle, isMobile && styles.sectionTitleMobile]}>
            Everything You Need to{' '}
            <Text style={styles.sectionTitleAccent}>Succeed</Text>
          </Text>
          <Text style={styles.sectionSubtitle}>
            Powerful tools to shorten and track your links
          </Text>

          <View style={[styles.featuresGrid, isMobile && styles.featuresGridMobile]}>
            {[
              {
                icon: 'flash-outline',
                title: 'Blazing Speed',
                desc: 'Instant URL redirects and lightning-fast in-browser image processing.',
                color: Colors.success,
              },
              {
                icon: 'cut-outline',
                title: 'Pro AI Tools',
                desc: 'Remove backgrounds and upscale images with industry-leading precision.',
                color: Colors.primary,
              },
              {
                icon: 'analytics-outline',
                title: 'Deep Analytics',
                desc: 'Track every click and asset interaction with real-time geographic data.',
                color: Colors.accent,
              },
              {
                icon: 'shield-checkmark-outline',
                title: 'Privacy First',
                desc: 'Your images never leave your browser for most tools. 100% secure.',
                color: '#14B8A6',
              },
            ].map((feature, index) => (
              <TouchableOpacity 
                key={index} 
                activeOpacity={0.8}
                onPress={() => {
                  if (feature.title.includes('AI')) scrollToCategory('Creative');
                  else if (feature.title.includes('Analytics')) scrollRef.current?.scrollTo({ y: 0, animated: true });
                  else if (feature.title.includes('Speed') || feature.title.includes('Fast')) scrollToCategory('Transform');
                  else if (feature.title.includes('Privacy')) scrollToCategory('Creative');
                  else scrollToCategory('Transform');
                }}
                style={[styles.featureCardWrap, isMobile && styles.featureCardMobile]}
              >
                <Card variant="glass" style={styles.featureCard}>
                  <View style={[styles.featureIconBg, { backgroundColor: feature.color + '15' }]}>
                    <Ionicons name={feature.icon} size={28} color={feature.color} />
                  </View>
                  <Text style={styles.featureTitle}>{feature.title}</Text>
                  <Text style={styles.featureDesc}>{feature.desc}</Text>
                </Card>
              </TouchableOpacity>
            ))}
          </View>

        </View>

        {/* Product Catalog Section */}
        <View style={styles.catalogSection}>
          <Text style={[styles.sectionTitle, isMobile && styles.sectionTitleMobile]}>
            Professional <Text style={styles.sectionTitleAccent}>Product Suite</Text>
          </Text>
          <Text style={styles.sectionSubtitle}>
            13 Free Image Tools & Powerful Link Management
          </Text>

          {TOOLS_CATEGORIES.map((cat, idx) => (
            <View 
              key={idx} 
              onLayout={(e) => { 
                // Capture accurate Y by adding common header/hero estimates if layout is relative
                // Or better, we define the catalog section ref and add to that.
                sectionPositions.current[cat.category] = e.nativeEvent.layout.y + 1100; 
              }}
              style={[styles.catalogCategory, isMobile && styles.catalogCategoryMobile]}
            >
              <View style={styles.categoryLabelContainer}>
                <Text style={styles.categoryLabel}>{cat.category}</Text>
                <View style={styles.categoryLine} />
              </View>
              <View style={[styles.catalogGrid, isMobile && styles.catalogGridMobile]}>
                {cat.items.map((item) => (
                  <TouchableOpacity 
                    key={item.id} 
                    onPress={() => router.push(item.route)}
                    style={[styles.catalogItem, isMobile && styles.catalogItemMobile]}
                  >
                    <Card variant="glass" style={styles.catalogCard}>
                      <View style={[styles.catalogIcon, { backgroundColor: item.color + '15' }]}>
                        <Ionicons name={item.icon} size={22} color={item.color} />
                      </View>
                      <View style={styles.catalogText}>
                        <Text style={styles.catalogItemTitle}>{item.title}</Text>
                        <Text style={styles.catalogItemDesc} numberOfLines={1}>{item.desc}</Text>
                      </View>
                    </Card>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          ))}
        </View>


        {/* FAQ Section */}
        <View style={styles.faqSection}>
          <Text style={[styles.sectionTitle, isMobile && styles.sectionTitleMobile]}>
            Frequently Asked <Text style={styles.sectionTitleAccent}>Questions</Text>
          </Text>
          <Text style={styles.sectionSubtitle}>
            Find answers to common questions about ShrinQE and our services
          </Text>

          <View style={styles.faqGrid}>
            {[
              {
                q: 'Are my images stored on your servers?',
                a: 'Most of our image tools process files directly in your browser. For AI tools like Background Removal, we use secure, transient processing that deletes your data immediately after completion.',
              },
              {
                q: 'Are shortened links permanent?',
                a: 'Yes, your shortened links will remain active as long as they comply with our safety guidelines. You can track their performance forever in your dashboard.',
              },
              {
                q: 'Do I need an account to use the tools?',
                a: 'You can use all image tools for free without an account. URL shortening with analytics requires a quick sign-up to save your data.',
              },
            ].map((faq, index) => (
              <Card key={index} variant="glass" style={styles.faqCard}>
                <Text style={styles.faqQuestion}>{faq.q}</Text>
                <Text style={styles.faqAnswer}>{faq.a}</Text>
              </Card>
            ))}
          </View>

        </View>

        {/* CTA Section */}
        <LinearGradient
          colors={['rgba(124, 58, 237, 0.1)', 'rgba(59, 130, 246, 0.05)', 'transparent']}
          style={styles.ctaSection}
        >
          <Text style={[styles.ctaTitle, isMobile && styles.ctaTitleMobile]}>
            Master Your Digital Assets
          </Text>
          <Text style={styles.ctaSubtitle}>
            Join 150K+ users who trust ShrinQE for link management and image processing.
          </Text>
          <Button
            title="Start Using ShrinQE — It's Free"
            onPress={() => router.push(isAuthenticated ? '/dashboard' : '/signup')}
            size="lg"
            icon={<Ionicons name="rocket-outline" size={20} color="#fff" />}
          />

        </LinearGradient>

        <Footer />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: Colors.bgPrimary,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },

  // Hero
  heroSection: {
    paddingTop: Spacing.xxxl + 20,
    paddingBottom: Spacing.xxxl,
    paddingHorizontal: Spacing.lg,
    position: 'relative',
    overflow: 'hidden',
  },
  orb: {
    position: 'absolute',
    borderRadius: 9999,
    opacity: 0.15,
  },
  orbPurple: {
    width: 400,
    height: 400,
    backgroundColor: Colors.primary,
    top: -100,
    right: -100,
  },
  orbBlue: {
    width: 300,
    height: 300,
    backgroundColor: Colors.accent,
    bottom: -50,
    left: -50,
  },
  heroContent: {
    maxWidth: 800,
    alignSelf: 'center',
    alignItems: 'center',
    width: '100%',
  },
  heroContentMobile: {
    paddingHorizontal: 0,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs + 2,
    backgroundColor: 'rgba(124, 58, 237, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(124, 58, 237, 0.2)',
    borderRadius: BorderRadius.full,
    paddingVertical: Spacing.xs + 2,
    paddingHorizontal: Spacing.md,
    marginBottom: Spacing.lg,
  },
  badgeText: {
    color: Colors.primaryLight,
    fontSize: FontSizes.sm,
    fontWeight: '600',
  },
  heroTitle: {
    fontSize: FontSizes.display,
    fontWeight: '900',
    color: Colors.textPrimary,
    textAlign: 'center',
    lineHeight: 68,
    letterSpacing: -1.5,
    marginBottom: Spacing.lg,
  },
  heroTitleMobile: {
    fontSize: FontSizes.xxxl,
    lineHeight: 44,
    letterSpacing: -1,
  },
  heroTitleGradient: {
    color: Colors.primaryLight,
  },
  heroSubtitle: {
    fontSize: FontSizes.lg,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 28,
    marginBottom: Spacing.xl + 8,
    maxWidth: 600,
  },
  heroSubtitleMobile: {
    fontSize: FontSizes.md,
    lineHeight: 24,
  },

  // URL Input
  urlInputContainer: {
    width: '100%',
  },

  urlInputContainerMobile: {
    maxWidth: '100%',
  },
  urlInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.bgCard,
    borderRadius: BorderRadius.lg,
    borderWidth: 1.5,
    borderColor: Colors.border,
    paddingLeft: Spacing.md,
    paddingRight: Spacing.xs,
    paddingVertical: Spacing.xs,
    ...Shadows.lg,
  },
  urlInputWrapperMobile: {
    paddingRight: Spacing.md,
  },
  urlIcon: {
    marginRight: Spacing.sm,
  },
  urlInput: {
    flex: 1,
    color: Colors.textPrimary,
    fontSize: FontSizes.md,
    paddingVertical: Spacing.md,
    fontWeight: '500',
    outlineStyle: 'none',
  },
  urlInputMobile: {
    fontSize: FontSizes.md,
  },
  shrinkButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.xl,
    borderRadius: BorderRadius.md,
  },
  shrinkButtonText: {
    color: '#fff',
    fontSize: FontSizes.md,
    fontWeight: '700',
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    marginTop: Spacing.sm + 4,
  },
  errorText: {
    color: Colors.error,
    fontSize: FontSizes.sm,
  },
  heroHint: {
    color: Colors.textMuted,
    fontSize: FontSizes.sm,
    marginTop: Spacing.lg,
    textAlign: 'center',
  },

  // Result
  resultContainer: {
    width: '100%',
    maxWidth: 680,
    marginTop: Spacing.md,
  },
  resultContent: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.successBg,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.success + '30',
    padding: Spacing.md,
    gap: Spacing.sm + 4,
  },
  resultUrl: {
    flex: 1,
    color: Colors.success,
    fontSize: FontSizes.md,
    fontWeight: '600',
  },
  copyButton: {},
  copyButtonInner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.sm,
  },
  copyButtonText: {
    color: '#fff',
    fontSize: FontSizes.sm,
    fontWeight: '600',
  },

  // Unified Product Suite
  mainActionContainer: {
    width: '100%',
    maxWidth: 900,
    alignItems: 'center',
    marginTop: Spacing.xl,
    gap: Spacing.xl,
  },
  mainActionContainerMobile: {
    gap: Spacing.lg,
  },
  // Bento Grid Redesign
  bentoContainer: {
    flexDirection: 'row',
    width: '100%',
    gap: Spacing.lg,
    justifyContent: 'center',
    height: 300,
  },
  bentoContainerMobile: {
    flexDirection: 'column',
    height: 'auto',
  },
  bentoMain: {
    flex: 1.2,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: '#8B5CF6' + '40',
    padding: Spacing.xxl,
    justifyContent: 'flex-end',
    position: 'relative',
    overflow: 'hidden',
    ...Shadows.glow,
  },
  bentoMainMobile: {
    minHeight: 240,
  },
  bentoGradientBg: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.8,
  },
  bentoMainGlow: {
    position: 'absolute',
    top: -50,
    right: -50,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#8B5CF6' + '20',
    // Polyfill for blur on web vs native
    ...(Platform.OS === 'web' ? { filter: 'blur(40px)' } : {}),
  },
  bentoMainIconLayer: {
    marginBottom: Spacing.md,
  },
  bentoMainTitle: {
    color: '#fff',
    fontSize: FontSizes.xxl,
    fontWeight: '800',
    marginBottom: Spacing.xs,
  },
  bentoMainDesc: {
    color: Colors.textSecondary,
    fontSize: FontSizes.sm,
    maxWidth: '90%',
  },
  bentoSideGrid: {
    flex: 1,
    flexDirection: 'column',
    gap: Spacing.md,
  },
  bentoSideGridMobile: {
    flexDirection: 'column',
  },
  bentoSm: {
    flex: 1,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    padding: Spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    position: 'relative',
    overflow: 'hidden',
  },
  bentoSmIcon: {
    padding: 8,
    borderRadius: BorderRadius.sm,
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  bentoSmTitle: {
    color: Colors.textPrimary,
    fontSize: FontSizes.md,
    fontWeight: '700',
    marginBottom: 2,
  },
  bentoSmDesc: {
    color: Colors.textMuted,
    fontSize: FontSizes.xs,
  },
  badgePro: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: '#8B5CF6',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: BorderRadius.full,
    zIndex: 10,
  },
  badgeProText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '900',
    textTransform: 'uppercase',
  },


  // Product Catalog Section
  catalogSection: {
    paddingVertical: Spacing.xxxl,
    paddingHorizontal: Spacing.lg,
    alignItems: 'center',
    backgroundColor: Colors.bgPrimary,
  },
  catalogCategory: {
    width: '100%',
    maxWidth: 1100,
    marginTop: Spacing.xl,
  },
  catalogCategoryMobile: {
    marginTop: Spacing.lg,
  },
  categoryLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    marginBottom: Spacing.lg,
  },
  categoryLabel: {
    color: Colors.textMuted,
    fontSize: FontSizes.xs,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  categoryLine: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.borderLight,
  },
  catalogGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.md,
    justifyContent: 'flex-start',
  },
  catalogGridMobile: {
    gap: Spacing.sm,
  },
  catalogItem: {
    width: '23.5%', // 4 columns
    minHeight: 100,
  },
  catalogItemMobile: {
    width: '48%', // 2 columns
  },
  catalogCard: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    padding: Spacing.md,
    minHeight: 80,
  },
  catalogIcon: {
    width: 44,
    height: 44,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  catalogText: {
    flex: 1,
    gap: 2,
  },
  catalogItemTitle: {
    color: Colors.textPrimary,
    fontSize: FontSizes.md,
    fontWeight: '700',
  },
  catalogItemDesc: {
    color: Colors.textMuted,
    fontSize: FontSizes.xs,
  },


  // Stats
  statsSection: {
    paddingVertical: Spacing.xxl,
    paddingHorizontal: Spacing.lg,
    backgroundColor: Colors.bgSecondary,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: Colors.borderLight,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    maxWidth: 900,
    alignSelf: 'center',
    width: '100%',
  },
  statsGridMobile: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: Spacing.lg,
  },
  statItem: {
    alignItems: 'center',
  },
  statItemMobile: {
    width: '45%',
    marginBottom: Spacing.lg,
    backgroundColor: Colors.bgCard,
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },

  statValue: {
    fontSize: FontSizes.xxxl,
    fontWeight: '900',
    color: Colors.textPrimary,
    letterSpacing: -1,
  },
  statLabel: {
    fontSize: FontSizes.sm,
    color: Colors.textMuted,
    marginTop: Spacing.xs,
    fontWeight: '500',
  },

  // Features
  featuresSection: {
    paddingVertical: Spacing.xxxl,
    paddingHorizontal: Spacing.lg,
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: FontSizes.xxxl,
    fontWeight: '800',
    color: Colors.textPrimary,
    textAlign: 'center',
    marginBottom: Spacing.sm + 4,
    letterSpacing: -0.5,
  },
  sectionTitleMobile: {
    fontSize: FontSizes.xxl,
  },
  sectionTitleAccent: {
    color: Colors.primaryLight,
  },
  sectionSubtitle: {
    fontSize: FontSizes.md,
    color: Colors.textMuted,
    textAlign: 'center',
    marginBottom: Spacing.xxl,
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: Spacing.lg,
    maxWidth: 1100,
    width: '100%',
  },
  featuresGridMobile: {
    gap: Spacing.md,
  },
  featureCard: {
    width: 320,
    minHeight: 180,
  },
  featureCardMobile: {
    width: '100%',
    minHeight: 140,
  },
  featureIconBg: {
    width: 52,
    height: 52,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.md,
  },
  featureTitle: {
    fontSize: FontSizes.lg,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: Spacing.xs + 2,
  },
  featureDesc: {
    fontSize: FontSizes.sm,
    color: Colors.textMuted,
    lineHeight: 20,
  },

  // CTA
  ctaSection: {
    paddingVertical: Spacing.xxxl + 20,
    paddingHorizontal: Spacing.lg,
    alignItems: 'center',
  },
  ctaTitle: {
    fontSize: FontSizes.xxxl,
    fontWeight: '800',
    color: Colors.textPrimary,
    textAlign: 'center',
    marginBottom: Spacing.md,
    letterSpacing: -0.5,
  },
  ctaTitleMobile: {
    fontSize: FontSizes.xxl,
  },
  ctaSubtitle: {
    fontSize: FontSizes.md,
    color: Colors.textMuted,
    textAlign: 'center',
    marginBottom: Spacing.xl,
    maxWidth: 500,
  },
  
  // FAQ
  faqSection: {
    paddingVertical: Spacing.xxxl,
    paddingHorizontal: Spacing.lg,
    alignItems: 'center',
    backgroundColor: Colors.bgSecondary,
  },
  faqGrid: {
    width: '100%',
    maxWidth: 900,
    gap: Spacing.md,
  },
  faqCard: {
    width: '100%',
    padding: Spacing.lg,
  },
  faqQuestion: {
    fontSize: FontSizes.md,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: Spacing.sm,
  },
  faqAnswer: {
    fontSize: FontSizes.sm,
    color: Colors.textMuted,
    lineHeight: 22,
  },

  catalogItemDesc: {
    color: Colors.textMuted,
    fontSize: FontSizes.xs,
  },
  backToTop: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    zIndex: 2000,
  },
  backToTopInner: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadows.glow,
  },
  featureCardWrap: {
    width: 320,
    minHeight: 180,
  },
});
