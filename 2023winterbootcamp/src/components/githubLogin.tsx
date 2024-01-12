import axios from "axios";

// 깃허브 로그인을 위한 API 호출 함수
const githubLogin = () => {
  // 여기에 실제로 깃허브 로그인 API 호출을 위한 URL을 추가해야 합니다.
  const githubAuthURL = "http://localhost:8080/api/oauth/callback";

  // Axios를 사용하여 API 호출
  axios
    .get(githubAuthURL)
    .then((response) => {
      // 깃허브 API 응답 처리
      console.log("Github API Response:", response.data);
      // 여기에서 응답 처리 로직을 작성하세요
    })
    .catch((error) => {
      // 오류 처리
      console.error("Error fetching data:", error);
    });
};

export default githubLogin;
