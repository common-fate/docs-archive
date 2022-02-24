import Head from '@docusaurus/Head';
import React from 'react';

// Default implementation, that you can customize
// Additional scripts can be added by rendering <Head>
// import Head from '@docusaurus/Head'
function Root({ children }) {
	return (
		<>
			<Head>
				<meta
					name="google-site-verification"
					content="GJwPK35c1KWWo22qgJiVpmmXtjzkCu9eQ-fUMJfZS98"
				/>
				<script
					defer
					data-domain="docs.commonfate.io"
					src="https://plausible.io/js/plausible.js"
				/>
			</Head>

			{children}
		</>
	);
}

export default Root;
