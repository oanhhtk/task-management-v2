import { Spin } from "antd";

type LoadingPageType = {
  loading: boolean;
};

export default function Loading({ loading }: LoadingPageType) {
  return (
    <div>
      {loading ? (
        <div className="overlay">
          <div className="overlay__inner">
            <div className="overlay__content">
              <Spin spinning />
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
