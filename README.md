# AEON Bank Frontend Challenge Solution

This project implements the required features (Multi-Step Login Flow and Transaction History Dashboard) using **Next.js 14 (App Router)** and **TypeScript**, styled with **Tailwind CSS (AEON Pink Theme)**.

The solution includes state persistence using **React Context** and **Local Storage** to ensure the login status remains active across page reloads.

## 1. Project Structure

| Path | Description | Challenge |
| :--- | :--- | :--- |
| `app/layout.tsx` | Root Layout. Wraps content with the Client Wrapper. | - |
| `app/page.tsx` | **Dashboard Page**. Fetches and displays the Transaction History Table (Challenge 3). **Only loads if logged in.** | **Challenge 3** |
| `app/login/page.tsx` | **Multi-Step Login Flow** (Username -> Secure Word -> Password). Includes username validation. | **Challenge 2** |
| `app/api/login/route.ts` | Mock API for final login submission. | **Challenge 2** |
| `app/api/getSecureWord/route.ts` | Mock API for fetching the secure word. | **Challenge 2** |
| `app/api/transaction-history/route.ts` | Mock API for fetching transaction data. | **Challenge 3** |
| `components/Navbar.tsx` | The AEON-themed Navbar. Uses AuthContext to switch between Login/Logout buttons. | **Challenge 1** |
| `components/TransactionTable.tsx` | Reusable component to render the table. | **Challenge 3** |
| `context/AuthContext.tsx` | **Global State for authentication**, using `useState` and `useEffect` with `localStorage` for persistence. | **Core Feature** |

## 2. How to Run the Project

1.  **Clone the Repository:**
    ```bash
    git clone 
    cd aeon-challenge
    ```

2.  **Install Dependencies:**
    ```bash
    npm install
    # (Includes next, react, react-dom, tailwindcss, js-sha256, react-icons)
    ```

3.  **Start the Development Server:**
    ```bash
    npm run dev
    ```
    The application will be accessible at `http://localhost:3000`.