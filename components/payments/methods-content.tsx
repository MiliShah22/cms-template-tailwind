"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { CreditCard, Plus, Shield, Globe, AlertTriangle, CheckCircle2 } from "lucide-react"

const gateways = [
  {
    id: "stripe",
    name: "Stripe",
    status: "connected",
    mode: "Live",
    currencies: "USD, EUR, GBP",
    default: true,
  },
  {
    id: "paypal",
    name: "PayPal",
    status: "connected",
    mode: "Sandbox",
    currencies: "Multi‑currency",
    default: false,
  },
  {
    id: "manual",
    name: "Manual invoicing",
    status: "enabled",
    mode: "Offline",
    currencies: "Custom",
    default: false,
  },
]

const cards = [
  {
    id: "card-1",
    brand: "Visa",
    last4: "4242",
    label: "Primary billing card",
    expiry: "08 / 28",
    default: true,
  },
  {
    id: "card-2",
    brand: "Mastercard",
    last4: "9938",
    label: "Marketing budget",
    expiry: "01 / 27",
    default: false,
  },
]

export function PaymentMethodsContent() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs font-medium text-emerald-600">
            <CreditCard className="h-4 w-4" />
            Billing
          </div>
          <h1 className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">Payment methods</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Configure gateways and saved cards used to charge your CMSFullForm subscriptions.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <Plus className="h-4 w-4" />
            Add payment method
          </Button>
        </div>
      </div>

      {/* Status banner */}
      <Card className="border-emerald-200 bg-emerald-50/60 dark:border-emerald-500/30 dark:bg-emerald-500/5">
        <CardContent className="flex flex-col gap-2 py-3 text-xs text-gray-700 dark:text-gray-200 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
            <span>
              Live payments are <span className="font-medium">enabled</span>. Your default gateway is{" "}
              <span className="font-medium">Stripe (Live)</span>.
            </span>
          </div>
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-3.5 w-3.5 text-amber-500" />
            <span>Always test new configurations in a staging workspace first.</span>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="gateways" className="w-full">
        <TabsList className="w-full sm:w-auto">
          <TabsTrigger value="gateways">Gateways</TabsTrigger>
          <TabsTrigger value="cards">Workspace cards</TabsTrigger>
        </TabsList>

        <TabsContent value="gateways" className="pt-4 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Connected gateways</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {gateways.map((gw) => (
                <div
                  key={gw.id}
                  className="flex flex-col gap-2 rounded-md border bg-background px-3 py-2 text-xs sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-md bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-200">
                      {gw.name[0]}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-gray-100">{gw.name}</p>
                      <p className="text-[11px] text-gray-500">
                        {gw.mode} · {gw.currencies}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {gw.default && (
                      <Badge className="text-[10px]" variant="outline">
                        Default
                      </Badge>
                    )}
                    <Badge
                      className="text-[10px]"
                      variant={gw.status === "connected" || gw.status === "enabled" ? "default" : "outline"}
                    >
                      {gw.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Webhook & domain</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-xs text-gray-600 dark:text-gray-300">
              <div className="grid gap-3 sm:grid-cols-[1.6fr_minmax(0,1fr)]">
                <div>
                  <p className="mb-1 font-medium text-gray-900 dark:text-gray-100">Webhook URL</p>
                  <Input
                    defaultValue="https://cmsfullform-demo.com/webhooks/payments"
                    className="h-8 text-xs"
                  />
                  <p className="mt-1 text-[11px] text-gray-500">
                    Configure this in your billing provider to receive payment events.
                  </p>
                </div>
                <div>
                  <p className="mb-1 font-medium text-gray-900 dark:text-gray-100">Return URL</p>
                  <Input defaultValue="https://cmsfullform-demo.com/billing/return" className="h-8 text-xs" />
                </div>
              </div>
              <div className="flex items-center justify-between rounded-md bg-gray-50 px-3 py-2 text-[11px] dark:bg-gray-900/50">
                <div className="flex items-center gap-2">
                  <Shield className="h-3.5 w-3.5 text-emerald-500" />
                  <span>All payment pages are served via HTTPS.</span>
                </div>
                <div className="hidden items-center gap-1 sm:flex">
                  <Globe className="h-3.5 w-3.5 text-gray-400" />
                  <span>cmsfullform-demo.com</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cards" className="pt-4 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Saved workspace cards</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {cards.map((card) => (
                <div
                  key={card.id}
                  className="flex flex-col gap-2 rounded-md border bg-background px-3 py-2 text-xs sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-md bg-gray-900 text-[11px] font-semibold text-white dark:bg-gray-100 dark:text-gray-900">
                      {card.brand[0]}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-gray-100">
                        {card.brand} · •••• {card.last4}
                      </p>
                      <p className="text-[11px] text-gray-500">
                        {card.label} · Expires {card.expiry}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <span className="text-[11px] text-gray-500">Default</span>
                      <Switch checked={card.default} />
                    </div>
                    <Button variant="outline" size="sm" className="h-7 px-2 text-[11px]">
                      Remove
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

