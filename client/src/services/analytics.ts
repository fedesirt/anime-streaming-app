// Servicio de Analytics para Monetización
export interface AnalyticsEvent {
  event: string;
  properties?: Record<string, any>;
  timestamp?: number;
  userId?: string;
}

export interface UserMetrics {
  userId: string;
  donationStatus: 'free' | 'basic' | 'premium' | 'family';
  totalWatchTime: number;
  episodesWatched: number;
  lastActive: Date;
  registrationDate: Date;
  totalSpent: number;
  referralCount: number;
}

export interface RevenueMetrics {
  monthlyRevenue: number;
  activeDonations: number;
  conversionRate: number;
  churnRate: number;
  averageRevenuePerUser: number;
  lifetimeValue: number;
}

export class AnalyticsService {
  private static instance: AnalyticsService;
  private events: AnalyticsEvent[] = [];
  private userId: string | null = null;

  static getInstance(): AnalyticsService {
    if (!AnalyticsService.instance) {
      AnalyticsService.instance = new AnalyticsService();
    }
    return AnalyticsService.instance;
  }

  // Inicializar analytics
  init(userId?: string) {
    this.userId = userId || null;
    this.loadAnalytics();
  }

  // Rastrear eventos
  track(event: string, properties?: Record<string, any>) {
    const analyticsEvent: AnalyticsEvent = {
      event,
      properties,
      timestamp: Date.now(),
      userId: this.userId || undefined
    };

    this.events.push(analyticsEvent);
    this.saveAnalytics();
    this.sendToServer(analyticsEvent);
  }

  // Eventos de monetización
  trackDonation(plan: string, price: number) {
    this.track('donation_started', {
      plan,
      price,
      currency: 'USD'
    });
  }

  trackPayment(method: string, amount: number, success: boolean) {
    this.track('payment_attempted', {
      method,
      amount,
      success,
      currency: 'USD'
    });
  }

  trackContentView(contentId: string, contentType: 'anime' | 'episode', duration: number) {
    this.track('content_viewed', {
      contentId,
      contentType,
      duration,
      timestamp: Date.now()
    });
  }

  trackAdView(adType: string, revenue: number) {
    this.track('ad_viewed', {
      adType,
      revenue,
      currency: 'USD'
    });
  }

  trackPurchase(productId: string, price: number, category: string) {
    this.track('purchase_completed', {
      productId,
      price,
      category,
      currency: 'USD'
    });
  }

  // Métricas de usuario
  getUserMetrics(): UserMetrics | null {
    if (!this.userId) return null;

    const stored = localStorage.getItem(`user_metrics_${this.userId}`);
    return stored ? JSON.parse(stored) : null;
  }

  updateUserMetrics(metrics: Partial<UserMetrics>) {
    if (!this.userId) return;

    const current = this.getUserMetrics();
    const updated = {
      ...current,
      ...metrics,
      userId: this.userId
    };

    localStorage.setItem(`user_metrics_${this.userId}`, JSON.stringify(updated));
  }

  // Métricas de ingresos
  getRevenueMetrics(): RevenueMetrics {
    const stored = localStorage.getItem('revenue_metrics');
    return stored ? JSON.parse(stored) : {
      monthlyRevenue: 0,
      activeDonations: 0,
      conversionRate: 0,
      churnRate: 0,
      averageRevenuePerUser: 0,
      lifetimeValue: 0
    };
  }

  updateRevenueMetrics(metrics: Partial<RevenueMetrics>) {
    const current = this.getRevenueMetrics();
    const updated = { ...current, ...metrics };
    localStorage.setItem('revenue_metrics', JSON.stringify(updated));
  }

  // Análisis de comportamiento
  getWatchTimeAnalytics() {
    const events = this.events.filter(e => e.event === 'content_viewed');
    const totalWatchTime = events.reduce((sum, e) => sum + (e.properties?.duration || 0), 0);
    const averageWatchTime = events.length > 0 ? totalWatchTime / events.length : 0;

    return {
      totalWatchTime,
      averageWatchTime,
      totalViews: events.length,
      topContent: this.getTopContent(events)
    };
  }

  getTopContent(events: AnalyticsEvent[]) {
    const contentCount: Record<string, number> = {};
    
    events.forEach(event => {
      const contentId = event.properties?.contentId;
      if (contentId) {
        contentCount[contentId] = (contentCount[contentId] || 0) + 1;
      }
    });

    return Object.entries(contentCount)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 10)
      .map(([contentId, count]) => ({ contentId, views: count }));
  }

  // Predicciones de ingresos
  predictRevenue(months: number = 12): number[] {
    const currentMetrics = this.getRevenueMetrics();
    const predictions: number[] = [];
    
    let currentRevenue = currentMetrics.monthlyRevenue;
    const growthRate = 0.15; // 15% crecimiento mensual
    
    for (let i = 0; i < months; i++) {
      predictions.push(currentRevenue);
      currentRevenue *= (1 + growthRate);
    }
    
    return predictions;
  }

  // Análisis de cohortes
  getCohortAnalysis() {
    const events = this.events.filter(e => e.event === 'donation_started');
    const cohorts: Record<string, number[]> = {};
    
    events.forEach(event => {
      const date = new Date(event.timestamp || 0);
      const month = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      
      if (!cohorts[month]) {
        cohorts[month] = [];
      }
      
      cohorts[month].push(event.timestamp || 0);
    });
    
    return cohorts;
  }

  // Exportar datos
  exportData() {
    return {
      events: this.events,
      userMetrics: this.getUserMetrics(),
      revenueMetrics: this.getRevenueMetrics(),
      watchTimeAnalytics: this.getWatchTimeAnalytics(),
      cohortAnalysis: this.getCohortAnalysis()
    };
  }

  // Guardar en localStorage
  private saveAnalytics() {
    localStorage.setItem('analytics_events', JSON.stringify(this.events));
  }

  // Cargar desde localStorage
  private loadAnalytics() {
    const stored = localStorage.getItem('analytics_events');
    this.events = stored ? JSON.parse(stored) : [];
  }

  // Enviar al servidor (simulado)
  private sendToServer(event: AnalyticsEvent) {
    // En producción, aquí enviarías los datos a tu servidor
    console.log('Analytics Event:', event);
    
    // Simular envío a servidor
    fetch('/api/analytics', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(event)
    }).catch(error => {
      console.error('Error sending analytics:', error);
    });
  }
}

// Exportar instancia singleton
export const analytics = AnalyticsService.getInstance();
