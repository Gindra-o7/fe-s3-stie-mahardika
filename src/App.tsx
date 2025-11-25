import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "react-oidc-context";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/query-client";
import { ThemeProvider } from "@/components/themes/theme-provider";
import { LanguageProvider } from "@/contexts/LanguageContext";
import router from "./routers/app.router";
import { AlertDialog } from "./components/ui/alert-dialog";
import { Toaster } from "@/components/ui/sonner"
const App = () => {
	return (
		<AuthProvider>
			<QueryClientProvider client={queryClient}>
				<ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
					<LanguageProvider>
						<AlertDialog>
							<RouterProvider router={router} />
							<Toaster
								position="bottom-right" 
								richColors 
								closeButton 
								expand
							/>
						</AlertDialog>
					</LanguageProvider>
				</ThemeProvider>
			</QueryClientProvider>
		</AuthProvider>
	);
};

export default App;
