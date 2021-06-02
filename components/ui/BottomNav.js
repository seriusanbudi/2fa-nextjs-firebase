import styled from "styled-components";
import Button from "components/ui/Button";
import { IoHomeOutline, IoNotificationsOutline } from "react-icons/io5";
import { useRouter } from "next/router";

const Wrapper = styled("div")`
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 14px;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: #fff;
  z-index: 10;
  border-top: solid 2px ${({ theme }) => theme.colors.muted};
`;

const BottomNav = () => {
  const router = useRouter();

  return (
    <Wrapper>
      <Button variant="link" onClick={() => router.push("/")}>
        <IoHomeOutline style={{ fontSize: 24 }} />
      </Button>
      <Button variant="link">
        <IoNotificationsOutline style={{ fontSize: 24 }} />
      </Button>
    </Wrapper>
  );
};

export default BottomNav;
