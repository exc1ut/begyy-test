// Root
export const ROOT_URL = '/'

// Spread aliases
export const SPREAD_QUERY = 'aliases'

// Queries
export const CATEGORY_QUERY = 'category'
export const COLLECTION_QUERY = 'collection'
export const ORDERING_QUERY = 'ordering'
export const SEARCH_QUERY = 'search'
export const OPTIONS_QUERY = 'product_options'
export const BRANDS_QUERY = 'brand'

// Pages Aliases
export const DELIVERY_ALIAS = 'delivery'
export const PAYMENT_ALIAS = 'payment'
export const ABOUT_US_ALIAS = 'about-us'
export const CONTACTS_ALIAS = 'contacts'
export const COOPERATION_ALIAS = 'cooperation'
export const SOCIAL_MEDIA_ALIAS = 'social-media'
export const TERMS_OF_USE_ALIAS = 'terms-of-use'
export const PRIVACY_POLICY_ALIAS = 'privacy-policy'
export const DEALERS_ALIAS = 'dealers'
export const RECEIPT_ALIAS = 'receipt'
export const RETURNS_ALIAS = 'returns'
export const SUCCESS_URL = '/success'
export const INSTALLATIONS_ALIAS = 'installations'

// Cart
export const CART_URL = '/cart'

// Development
export const DEVELOPMENT_URL = '/development'

// Brands
const BRANDS = '/brands'
export const BRANDS_URL = `${BRANDS}`
export const BRANDS_ITEM_URL = `${BRANDS}/%s/`

// Products
const PRODUCTS = '/categories'
export const PRODUCTS_URL = `${PRODUCTS}`
export const PRODUCTS_SLUG_URL = `${PRODUCTS}/%s`
export const PRODUCTS_BRANDS_ITEM_URL = `${PRODUCTS}/?${BRANDS_QUERY}=%d`
export const PRODUCTS_CATEGORY_ITEM_URL = `${PRODUCTS}/?${CATEGORY_QUERY}=%d`
export const PRODUCTS_COLLECTIONS_ITEM_URL = `${PRODUCTS}/?${COLLECTION_QUERY}=%s`

// Product
const PRODUCT = '/product'
export const PRODUCTS_ITEM_URL = `${PRODUCT}/%s`

// Pages
const PAGES = ''
export const PAGES_DETAIL = `${PAGES}/%s`
