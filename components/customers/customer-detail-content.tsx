"use client"

import type { Customer } from "@/lib/customers"
import type { Order } from "@/lib/orders"
import { OrderTable, OrderData } from "@/components/shared/order-table"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Mail, Phone, User, DollarSign, MapPin, Users, Edit, Clock, Package, MessageCircle, TrendingUp } from "lucide-react"
import { useMemo, useState } from "react"

// Timeline event type
interface TimelineEvent {
  id: string
  action: string
  description: string
  time: string
  type: 'order' | 'payment' | 'shipping' | 'other'
}

interface CustomerDetailContentProps {
  customer: Customer
  orders: Order[]
}

export function CustomerDetailContent({ customer, orders }: CustomerDetailContentProps) {
  const [activeTab, setActiveTab] = useState('overview')

  const sortedOrders = useMemo(() => 
    orders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()), 
    [orders]
  )

  const orderList: OrderData[] = useMemo(() => 
    sortedOrders.map((o) => ({
      id: o.id,
      customer: o.customer.name,
      total: o.total,
      items: o.items.length,
      createdAt: o.createdAt,
      status: o.status,
    })), 
    [sortedOrders]
  )

  const totalSpend = useMemo(() => {
    return orders.reduce((sum, order) => {
      const price = parseFloat(order.total.replace(/[$, ]/g, ''))
      return sum + price
    }, 0).toLocaleString('en-US', { style: 'currency', currency: 'USD' })
  }, [orders])

  const avgOrderValue = useMemo(() => {
    if (orders.length === 0) return '$0.00'
    const avg = orders.reduce((sum, order) => sum + parseFloat(order.total.replace(/[$, ]/g, '')), 0) / orders.length
    return avg.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
  }, [orders])

  // Flatten all order timelines into customer activity feed
  const activityFeed: TimelineEvent[] = useMemo(() => {
    const events: TimelineEvent[] = []
    orders.forEach(order => {
      order.timeline?.forEach(t => {
        events.push({
          id: `${order.id}-${t.id}`,
          action: t.action,
          description: t.description,
          time: t.time,
          type: t.action.toLowerCase().includes('payment') ? 'payment' : 
                t.action.toLowerCase().includes('ship') ? 'shipping' : 
                t.action.toLowerCase().includes('order') ? 'order' : 'other'
        })
      })
    })
    return events.sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()).slice(0, 10)
  }, [orders])

  const getSegmentBadge = (segment: string) => {
    const colors = {
      vip: 'bg-gradient-to-r from-purple-500 to-pink-500 text-white',
      new: 'bg-gradient-to-r from-green-500 to-emerald-500 text-white',
      inactive: 'bg-gradient-to-r from-gray-500 to-gray-600 text-white'
    }
    return colors[segment.toLowerCase() as keyof typeof colors] || 'bg-gray-500 text-white'
  }

  return (
    <div className="space-y-8">
      {/* Hero Header */}
      <div className="flex flex-col lg:flex-row lg:items-start lg:gap-8">
        <Link href="/customers/all" className="self-start mb-4 lg:mb-0">
          <Button variant="ghost" size="sm" className="h-9 w-9 p-0">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        
        <div className="flex flex-col items-center lg:flex-row lg:items-start gap-6 lg:flex-1">
          {/* Avatar */}
          <div className="w-24 h-24 lg:w-32 lg:h-32 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-2xl font-bold text-white shadow-2xl ring-4 ring-white/20">
            {customer.avatar}
          </div>
          
          {/* Profile Info */}
          <div className="text-center lg:text-left lg:flex-1 space-y-3">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-200 bg-clip-text text-transparent">
                {customer.name}
              </h1>
              <Badge className={`px-3 py-1 text-sm font-semibold ${getSegmentBadge(customer.segment)}`}>
                {customer.segment.toUpperCase()}
              </Badge>
              <Badge variant="secondary" className="font-mono text-xs bg-muted/50">
                {customer.id}
              </Badge>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Mail className="h-4 w-4" />
                <span>{customer.email}</span>
              </div>
              <div className="flex items-center gap-1">
                <Phone className="h-4 w-4" />
                <span>{customer.phone}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-2 self-start lg:self-auto">
          <Button variant="outline" size="sm">
            <Edit className="w-4 h-4 mr-2" />
            Edit Customer
          </Button>
          <Button variant="outline" size="sm">
            <MessageCircle className="w-4 h-4 mr-2" />
            Send Email
          </Button>
          <Button variant="outline" size="sm">
            <Users className="w-4 h-4 mr-2" />
            View Segment
          </Button>
        </div>
      </div>

      {/* Main Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="orders">Orders ({orders.length})</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Lifetime Stats */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Lifetime Value</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{totalSpend}</div>
                <p className="text-xs text-muted-foreground">Total spent</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Orders</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{orders.length}</div>
                <p className="text-xs text-muted-foreground">Total orders</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg Order</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{avgOrderValue}</div>
                <p className="text-xs text-muted-foreground">Average value</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Last Order</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-sm font-mono">{sortedOrders[0]?.createdAt || 'Never'}</div>
                <p className="text-xs text-muted-foreground">Most recent</p>
              </CardContent>
            </Card>
          </div>

          {/* Contact Info Card */}
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  Address
                </div>
                <p className="text-muted-foreground">{customer.address}</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  Segment
                </div>
                <Badge className={getSegmentBadge(customer.segment)} className="text-sm">
                  {customer.segment}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Order Trend Chart Placeholder */}
          <Card>
            <CardHeader>
              <CardTitle>Order History</CardTitle>
            </CardHeader>
            <CardContent p-0>
              <div className="h-64 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-800/30 dark:to-slate-800/30 rounded-lg flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <TrendingUp className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>Order trend chart</p>
                  <p className="text-sm">Coming soon</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Orders Tab */}
        <TabsContent value="orders">
          <OrderTable
            title="Customer Orders"
            description="Complete order history for this customer, sorted by recency."
            orders={orderList}
          />
        </TabsContent>

        {/* Activity Tab */}
        <TabsContent value="activity">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <p className="text-sm text-muted-foreground">All recent actions across orders and account</p>
            </CardHeader>
            <CardContent>
              {activityFeed.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  No recent activity
                </div>
              ) : (
                <div className="space-y-4">
                  {activityFeed.map((event) => (
                    <div key={event.id} className="flex gap-4 p-4 hover:bg-accent rounded-lg transition-colors">
                      <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                        event.type === 'order' ? 'bg-blue-500' :
                        event.type === 'payment' ? 'bg-green-500' :
                        event.type === 'shipping' ? 'bg-orange-500' : 'bg-gray-500'
                      }`} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <h4 className="font-semibold text-sm">{event.action}</h4>
                          <span className="text-xs font-mono text-muted-foreground whitespace-nowrap">
                            {event.time}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{event.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
