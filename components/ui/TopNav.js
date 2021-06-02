import styled from "styled-components";
import { useRouter } from "next/router";
import { useCurrentUser } from "hooks";

const Wrapper = styled("div")`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding: 24px 14px;
`;

const TopNav = () => {
  const router = useRouter();
  const { username } = useCurrentUser();

  return (
    <Wrapper>
      <div>
        <h3 className="text-3xl font-bold">
          Hello, <br />
          {username}
        </h3>
      </div>
      <div
        onClick={() => router.push("/me")}
        style={{ width: 48, height: 48 }}
        className="rounded-xl bg-gray-200"
      />
    </Wrapper>
  );
};

export default TopNav;
