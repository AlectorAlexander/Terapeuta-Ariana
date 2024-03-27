import ArianaContext from "@/context/ArianaContext";
import { useContext } from "react";
import { PlusOutlined } from '@ant-design/icons';
import styles from "@/styles/blog/BlogComponent.module.css";
import { useRouter } from "next/router";
import useAuthentication from "@/hooks/useAuthentication";


function BlogComponent() {
  useAuthentication();
  const router = useRouter();

  const { isAdmin } = useContext(ArianaContext);

  const moveToEditionPage = () => {
    router.push('/blog/edit-blog');
  };  

  const renderToAdmin = () => {
    return (
      <div>
        <PlusOutlined onClick={moveToEditionPage} className={styles.icon} />
      </div>
    );
  };

  return (
    <div>
      {isAdmin ? renderToAdmin() : null}
    </div>
  );
}

export default BlogComponent;