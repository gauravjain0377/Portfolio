/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { dev }) => {
    if (dev) {
      config.cache = false;
    }
    
    // Update sass-loader to use modern API
    const sassRule = config.module.rules.find(rule => 
      rule.test && rule.test.toString().includes('scss|sass')
    );
    
    if (sassRule) {
      const sassLoader = sassRule.oneOf?.find(oneOf => 
        oneOf.use?.find(use => use.loader && use.loader.includes('sass-loader'))
      );
      
      if (sassLoader) {
        const loader = sassLoader.use.find(use => use.loader && use.loader.includes('sass-loader'));
        if (loader && loader.options) {
          loader.options.api = "modern";
        }
      }
    }
    
    return config;
  },
};

export default nextConfig;
