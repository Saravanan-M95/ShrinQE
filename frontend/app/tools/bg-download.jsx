import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { API_URL } from '../../constants/config';
import { useAuth } from '../../contexts/AuthContext';
import ToolPageLayout from '../../components/tools/ToolPageLayout';
import Card from '../../components/ui/Card';
import { Colors, Spacing, FontSizes } from '../../constants/theme';
import { Ionicons } from '@expo/vector-icons';

export default function BgDownloadRoute() {
  const params = useLocalSearchParams();
  const router = useRouter();
  const { token, isAuthenticated, isLoading } = useAuth();
  const [status, setStatus] = useState('verifying'); // verifying, downloading, success, error
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    // Wait for the auth framework to finish checking local storage
    if (isLoading) return;

    const handleReturn = async () => {
      try {
        const { order_id, internal_id } = params;
        if (!order_id) {
            setStatus('error');
            setErrorMsg('Missing order ID.');
            return;
        }

        if (!token) {
            setStatus('error');
            setErrorMsg('Authentication lost. Please login again.');
            return;
        }

        // 1. Verify Payment Status
        setStatus('verifying');
        const verifyRes = await fetch(`${API_URL}/api/payments/verify/${order_id}`);
        const verifyData = await verifyRes.json();

        if (verifyData.paymentStatus !== 'PAID') {
            setStatus('error');
            setErrorMsg(`Payment not completed. Status: ${verifyData.paymentStatus}`);
            return;
        }

        setStatus('downloading');
        
        const { image_id } = params;
        if (!image_id) {
            setStatus('error');
            setErrorMsg('Missing image reference ID.');
            return;
        }

        // Trigger Download
        const downloadUrl = `${API_URL}/api/tools/download-bg/${image_id}`;
        const downloadRes = await fetch(downloadUrl, {
            headers: { 'Authorization': `Bearer ${token}` }
        });

        if (!downloadRes.ok) {
            setStatus('error');
            setErrorMsg('Failed to download the clean image. Please contact support.');
            return;
        }

        const blob = await downloadRes.blob();
        const objectUrl = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = objectUrl;
        link.download = `shrinqe-no-bg-${image_id}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setTimeout(() => window.URL.revokeObjectURL(objectUrl), 100);

        setStatus('success');
      } catch (err) {
          setStatus('error');
          setErrorMsg(err.message);
      }
    };
    if (params.order_id) {
        handleReturn();
    }
  }, [params.order_id, isLoading, token]);

  return (
    <ToolPageLayout
      title="Payment Status"
      description="Verifying your payment and preparing your download."
      icon="cash-outline"
      iconColor="#10B981"
    >
      <View style={styles.container}>
        <Card variant="glass" style={styles.card}>
            {status === 'verifying' && (
                <>
                    <ActivityIndicator size="large" color={Colors.primary} />
                    <Text style={styles.statusText}>Verifying Payment with Cashfree...</Text>
                </>
            )}
            {status === 'downloading' && (
                <>
                    <ActivityIndicator size="large" color={Colors.success} />
                    <Text style={styles.statusText}>Payment Successful! Preparing Download...</Text>
                </>
            )}
            {status === 'success' && (
                <>
                    <Ionicons name="checkmark-circle" size={64} color={Colors.success} />
                    <Text style={styles.successText}>Download Started!</Text>
                    <TouchableOpacity onPress={() => router.push('/tools/remove-background')} style={styles.btn}>
                        <Text style={styles.btnText}>Back to Tools</Text>
                    </TouchableOpacity>
                </>
            )}
            {status === 'error' && (
                 <>
                 <Ionicons name="close-circle" size={64} color={Colors.danger} />
                 <Text style={styles.errorText}>Oops! {errorMsg}</Text>
                 <TouchableOpacity onPress={() => router.push('/tools/remove-background')} style={styles.btn}>
                    <Text style={styles.btnText}>Try Again</Text>
                 </TouchableOpacity>
             </>
            )}
        </Card>
      </View>
    </ToolPageLayout>
  );
}

const styles = StyleSheet.create({
    container: { marginTop: Spacing.xl, alignItems: 'center' },
    card: { padding: Spacing.xl, alignItems: 'center', minWidth: 300, gap: Spacing.md },
    statusText: { fontSize: FontSizes.md, color: Colors.textPrimary, marginTop: Spacing.md, fontWeight: '600' },
    successText: { fontSize: FontSizes.lg, color: Colors.success, marginTop: Spacing.md, fontWeight: '700' },
    errorText: { fontSize: FontSizes.md, color: Colors.danger, marginTop: Spacing.md, textAlign: 'center' },
    btn: {
        marginTop: Spacing.lg,
        backgroundColor: Colors.primary,
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 24,
    },
    btnText: {
        color: '#fff',
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'center'
    }
});
