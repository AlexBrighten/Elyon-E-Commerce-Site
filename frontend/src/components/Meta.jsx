import { Helmet } from 'react-helmet-async';

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='keyword' content={keywords} />
    </Helmet>
  );
};

Meta.defaultProps = {
  title: 'Elyon | Luxury Skincare',
  description: 'Shop elegant and effective skincare and bodycare.',
  keywords: 'skincare, bodycare, luxury, elyon',
};

export default Meta;
