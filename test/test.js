import test from 'ava';

test('foo', t => {
    t.pass();
    throw new Error('bar');
});



test('bar', async t => {
    const bar = Promise.resolve('bar');

    t.is(await bar, 'bar');
});