import Nav from "@/components/navegación/Nav";
import ProviderAlqu from "@/context/ProviderAlqu";


export default function LayoutCarrito({
 children
}: {
 children: React.ReactNode;
}) {
  return (
    <main>
      <ProviderAlqu>
      <Nav></Nav>
      {children}  
      </ProviderAlqu>  
    </main>
  );
}