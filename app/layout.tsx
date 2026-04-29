import type { Metadata } from "next";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider, App } from "antd";
import { AuthProvider } from "@/lib/auth";
import "./globals.css";

export const metadata: Metadata = {
  title: "Flash Security - Management System",
  description: "Security company management system",
};

const theme = {
  token: {
    // Primary palette – Indigo 600
    colorPrimary: "#4f46e5",
    colorSuccess: "#10b981",
    colorWarning: "#f59e0b",
    colorError: "#ef4444",
    colorInfo: "#3b82f6",

    // Typography
    fontSize: 13,
    fontFamily:
      "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",

    // Shape
    borderRadius: 4,
    borderRadiusLG: 6,
    borderRadiusSM: 2,

    // Controls – compact
    controlHeight: 32,
    controlHeightSM: 26,
    controlHeightLG: 38,

    // Spacing
    paddingContentVertical: 8,
    paddingContentHorizontal: 12,

    // Colour accents
    colorBgContainer: "#ffffff",
    colorBgLayout: "#f1f5f9",
    colorBorder: "#e2e8f0",
    colorBorderSecondary: "#f1f5f9",
    colorTextSecondary: "#64748b",
    colorTextTertiary: "#94a3b8",
    colorFillAlter: "#f8fafc",
  },
  components: {
    Table: {
      cellPaddingBlock: 7,
      cellPaddingInline: 12,
      headerBg: "#f8fafc",
      headerColor: "#475569",
      headerSortActiveBg: "#f1f5f9",
      rowHoverBg: "#f8fafc",
      borderColor: "#e2e8f0",
      bodySortBg: "#fafafa",
    },
    Menu: {
      itemHeight: 36,
      subMenuItemBg: "transparent",
      itemSelectedBg: "rgba(79,70,229,0.18)",
      itemSelectedColor: "#818cf8",
      itemColor: "#94a3b8",
      itemHoverColor: "#c7d2fe",
      itemHoverBg: "rgba(255,255,255,0.06)",
      groupTitleColor: "#64748b",
    },
    Layout: {
      siderBg: "#0f172a",
      triggerBg: "#1e293b",
      headerBg: "#ffffff",
      headerHeight: 52,
    },
    Card: {
      paddingLG: 16,
    },
    Button: {
      fontWeight: 500,
    },
    Statistic: {
      contentFontSize: 22,
    },
    Tag: {
      borderRadiusSM: 3,
    },
    Drawer: {
      paddingLG: 20,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <AntdRegistry>
          <ConfigProvider theme={theme}>
            <App>
              <AuthProvider>{children}</AuthProvider>
            </App>
          </ConfigProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
