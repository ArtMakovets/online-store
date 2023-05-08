import ProductRepository from './ProductRepository';

const repositories = {
    'Products': ProductRepository,
}

export default {
    get: name => repositories[name]
};