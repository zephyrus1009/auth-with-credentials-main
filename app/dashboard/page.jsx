// file này trả về page Dashboard
// vì component UserInfo sẽ là client component
// nên tách riêng nó ra, để page Dashboard vẫn là server component.
import UserInfo from "@/components/UserInfo";

export default function Dashboard() {
  return <UserInfo />;
}
