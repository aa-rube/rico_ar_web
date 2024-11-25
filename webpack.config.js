module.exports = {
    module: {
      rules: [
        {
          test: /\.svg$/,
        //   type: 'asset/resource',
          use: [
            {
              loader: '@svgr/webpack',
              options: {
                svgo: true,
                svgoConfig: {
                  plugins: [{ removeViewBox: false }],
                },
              },
            },
          ],
        },
      ],
    },
  };
  