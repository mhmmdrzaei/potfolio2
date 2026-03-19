import Link from 'next/link';
import ScrollToTop from '../scrollToTop/scrollToTop.component';

const MoreInfo = () => {
  return (
    <div className="moreInfo">
      <Link href="/works#work-item-6">More Works</Link>

      <ScrollToTop>
        <Link href="/videos">Video Works</Link>
      </ScrollToTop>
    </div>
  );
};

export default MoreInfo;
