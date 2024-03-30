/*
 * Main and demo navigation arrays
 *
 * 'to' attribute points to the route name, not the path url
 */

export default {
  main: [
    {
      name: "Dashboard",
      to: "dashboard",
      icon: "si si-speedometer",
    },
    {
      name: "World Point",
      icon: "fa fa-arrows-to-dot",
      subActivePaths: "/world-point",
      sub: [
        {
          name: "Wallet",
          icon: "si si-wallet",
          to: "world-point-wallets",
        },
      ],
    },

    {
      name: "Users Management",
      icon: "fa fa-users",
      subActivePaths: "/users",
      sub: [
        {
          name: "Users List",
          to: "users-list",
        },
        {
          name: "Banned Users",
          to: "banned-users-list",
        },
        {
          name: "Closed Users",
          to: "closed-users-list",
        },
        {
          name: "Locked Users",
          to: "locked-users-list",
        },

      ],
    },
    {
      name: "Registrations",
      icon: "fa fa-users",
      subActivePaths: "/members",
      sub: [
        {
          name: "Pending Members",
          to: "members-registration",
        },
        {
          name: "Members List",
          to: "members-list",
        },
        {
          name: "Approved Members",
          to: "members-list-approved",
        },
        {
          name: "Rejected Members",
          to: "members-list-rejected",
        },
      ],
    },
    {
      name: "News Management",
      icon: "fa fa-newspaper",
      subActivePaths: "/news",
      sub: [
        {
          name: "News List",
          to: "news-list",
        },
      ],
    },
    {
      name: "Vouchers Management",
      icon: "fa fa-gift",
      subActivePaths: "/vouchers",
      sub: [
        {
          name: "Vouchers List",
          to: "vouchers-list",
        },
      ],
    },
    {
      name: "Agents Management",
      icon: "fa-user-secret",
      subActivePaths: "/agents",
      sub: [
        {
          name: "agents List",
          to: "agents-list",
        },
      ],
    },
    {
      name: "TopUp Management",
      icon: "fa fa-money-bill-trend-up",
      subActivePaths: "/topup",
      sub: [
        {
          name: "TopUp Requests",
          to: "topup-requests",
        },
        {
          name: "Pending Top up Requests",
          to: "pending-topup-requests",
        },
        {
          name: "Rejected Top up Requests",
          to: "rejected-topup-requests",
        },
        {
          name: "Approved Top up Requests",
          to: "approved-topup-requests",
        },
      ],
    },

    {
      name: "Withdrawal Management",
      icon: "fa fa-money-check",
      subActivePaths: "/withdraw",
      sub: [
        { name: "Withdrawal Requests", to: "withdrawal-requests" },
        {
          name: "Pending Withdraw Requests",
          to: "pendding-withdrawal-requests",
        },
      ],
    },
    {
      name: "Whitelist Management",
      icon: "fa fa-money-check",
      subActivePaths: "/whitelist",
      sub: [{ name: "WhiteLists", to: "whitelist-requests" }],
    },
    {
      name: "Bank Management",
      icon: "fa fa-money-check",
      subActivePaths: "/banks",
      sub: [{ name: "Banks List", to: "banks-list" }],
    },
    {
      name: "Promotions Management",
      icon: "fa fa-bullhorn",
      subActivePaths: "/promotions/list",
      sub: [{ name: "Promotion List", to: "promotions-list" }],
    },
    {
      name: "Ads Management",
      icon: "fa fa-bullhorn",
      subActivePaths: "/ads/list",
      sub: [{ name: "Ads List", to: "ads-list" }],
    },
    {
      name: "Highlights Management",
      icon: "fa fa-bullhorn",
      subActivePaths: "/highlights/list",
      sub: [{ name: "Highlights List", to: "highlights-list" }],
    },
    {
      name: "Security Questions",
      icon: "fa fa-clipboard-question",
      to: "security-questions",
    },
    {
      name: "Deposit Bank Management",
      icon: "fa fa-money-check",
      subActivePaths: "/deposit-banks",
      sub: [{ name: "Deposit Banks List", to: "deposit-banks" }],
    },
    {
      name: "Report",
      icon: "fa fa-newspaper",
      subActivePaths: "/reporting",
      sub: [
        { name: "Top up Requests",to:"report-topup" },
        { name: "Withdrawal Requests",to:"report-withdraw" },
        { name: "Deposit Bank",to:"report-deposit-bank" },
        { name: "Transactions",to:"report-transactions" },
        { name: "Compare IN OUT System",to:"report-compare" },
      ],
    },
    {
      name: "Configuration",
      icon: "si si-settings",
      subActivePaths: "/app/configuration",
      sub: [
        { name: "App Version", to: "app-config-version" },
        { name: "Wallets Config", to: "wallet-config" },
        { name: "Top up Config", to: "topup-config" },
        { name: "Transfer Config", to: "transfer-config" },
        { name: "Withdrawal Config", to: "withdrawal-config" },
        { name: "Cut Off Time Config", to: "cut-off-time-config" },
        { name: "General Setting", to: "general-setting" },
      ],
    },
  ],
};
