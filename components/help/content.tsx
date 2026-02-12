"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Search, HelpCircle, Mail, MessageCircle, BookOpen, Settings, Shield, Zap } from "lucide-react"

export function HelpContent() {
  return (
    <div className="space-y-6">
      {/* Header + search */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs font-medium text-emerald-600">
            <HelpCircle className="h-4 w-4" />
            Support
          </div>
          <h1 className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">Help Center</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Find answers, learn how CMSFullForm works, or contact our support team.
          </p>
        </div>
        <div className="w-full max-w-md">
          <div className="flex items-center gap-2 rounded-md border bg-background px-3 py-2 text-sm">
            <Search className="h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search in help articles..."
              className="h-8 border-0 bg-transparent px-0 text-sm shadow-none focus-visible:ring-0"
            />
          </div>
        </div>
      </div>

      {/* Quick access cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="space-y-1 pb-2">
            <CardTitle className="flex items-center gap-2 text-sm font-medium">
              <BookOpen className="h-4 w-4 text-blue-500" />
              Getting started
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-xs text-gray-600 dark:text-gray-300">
            <p>Learn the basics of CMSFullForm: dashboards, pages, and content structure.</p>
            <ul className="list-disc space-y-1 pl-4">
              <li>Overview of the admin dashboard</li>
              <li>How to create your first page</li>
              <li>Managing menus and navigation</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="space-y-1 pb-2">
            <CardTitle className="flex items-center gap-2 text-sm font-medium">
              <Settings className="h-4 w-4 text-emerald-500" />
              Configuration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-xs text-gray-600 dark:text-gray-300">
            <p>Connect domains, configure plugins and personalize your workspace.</p>
            <ul className="list-disc space-y-1 pl-4">
              <li>General settings & profile</li>
              <li>SEO & cache plugins</li>
              <li>Integrations & API keys</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="space-y-1 pb-2">
            <CardTitle className="flex items-center gap-2 text-sm font-medium">
              <Shield className="h-4 w-4 text-purple-500" />
              Accounts & security
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-xs text-gray-600 dark:text-gray-300">
            <p>Manage users, roles and keep your CMS instance secure.</p>
            <ul className="list-disc space-y-1 pl-4">
              <li>Inviting team members</li>
              <li>Role-based permissions</li>
              <li>Two-factor authentication</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Tabs: FAQ / Guides / Contact */}
      <Tabs defaultValue="faq" className="w-full">
        <TabsList className="w-full sm:w-auto">
          <TabsTrigger value="faq">FAQs</TabsTrigger>
          <TabsTrigger value="guides">Step‑by‑step guides</TabsTrigger>
          <TabsTrigger value="contact">Contact support</TabsTrigger>
        </TabsList>

        <TabsContent value="faq" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Frequently asked questions</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-sm">
                    How do I customize the dashboard layout?
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-gray-600 dark:text-gray-300">
                    Use the theme customizer in the top‑right corner to switch between layouts, adjust sidebar behavior,
                    and toggle dark mode. Changes are applied instantly and stored per browser.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-sm">
                    Where can I manage plugins like AllSite SEO or Super Cache?
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-gray-600 dark:text-gray-300">
                    Open the <span className="font-medium">Plugins</span> section from the sidebar to view installed
                    plugins. Each plugin has its own settings page (for example, AllSite SEO → Settings) where you can
                    fine‑tune behavior and templates.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger className="text-sm">
                    How do I connect billing or see my invoices?
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-gray-600 dark:text-gray-300">
                    Go to <span className="font-medium">Finance → Invoices</span> to see issued invoices. From there you
                    can export invoice data or wire the screen to your billing provider (Stripe, Paddle, etc.).
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger className="text-sm">
                    Can I extend CMSFullForm with my own modules?
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-gray-600 dark:text-gray-300">
                    Yes. Use the <span className="font-medium">API</span> and <span className="font-medium">Plugins</span>{" "}
                    sections to register custom modules, add menu items, and expose configuration UIs that follow the
                    existing dashboard layout.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="guides" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Popular workflows</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-gray-600 dark:text-gray-300">
              <div>
                <p className="font-medium text-gray-900 dark:text-gray-100">
                  1. Launch a new CMS project
                </p>
                <ol className="mt-1 list-decimal space-y-1 pl-4">
                  <li>Configure global settings and your profile.</li>
                  <li>Install or enable SEO & caching plugins.</li>
                  <li>Create core pages (Home, Blog, Landing pages).</li>
                  <li>Invite team members and assign roles.</li>
                </ol>
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-gray-100">
                  2. Optimize performance with Super Cache
                </p>
                <ol className="mt-1 list-decimal space-y-1 pl-4">
                  <li>Open <span className="font-medium">Plugins → Super Cache</span>.</li>
                  <li>Set default TTL and controller‑based rules.</li>
                  <li>Enable automatic cache invalidation on content updates.</li>
                </ol>
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-gray-100">
                  3. Improve SEO with AllSite SEO
                </p>
                <ol className="mt-1 list-decimal space-y-1 pl-4">
                  <li>Open <span className="font-medium">Plugins → AllSite SEO</span>.</li>
                  <li>Configure site‑wide meta tags and social sharing.</li>
                  <li>Define controller and schema templates for key content types.</li>
                </ol>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contact" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Contact support</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
              <div className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
                <p>
                  Need something that isn&apos;t covered in the docs? Reach out with your workspace URL and a short
                  description of the issue.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-blue-500" />
                    <span className="text-xs font-medium text-gray-700 dark:text-gray-200">
                      support@cmsfullform.com
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MessageCircle className="h-4 w-4 text-emerald-500" />
                    <span className="text-xs text-gray-600 dark:text-gray-300">
                      Live chat available for Pro workspaces
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-yellow-500" />
                    <span className="text-xs text-gray-600 dark:text-gray-300">
                      Typical response time: under 24 hours
                    </span>
                  </div>
                </div>
              </div>
              <div className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
                <p className="font-medium text-gray-900 dark:text-gray-100">Before you contact us</p>
                <ul className="list-disc space-y-1 pl-4">
                  <li>Include steps to reproduce and screenshots if possible.</li>
                  <li>Specify if this is production‑critical or a test environment.</li>
                  <li>Share any custom code or plugins that might be related.</li>
                </ul>
                <Button className="mt-2 w-full justify-center gap-2" variant="outline">
                  <Mail className="h-4 w-4" />
                  Open email draft
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}


