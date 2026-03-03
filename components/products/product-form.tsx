"use client"

import { useState } from 'react'
import { getCategorySlugs, getDisplayName } from '@/lib/products'
import { useAppDispatch } from '@/lib/store/hooks'
import { addProduct, updateProduct } from '@/lib/store/productsSlice'
import { Product } from '@/lib/products'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface ProductFormProps {
    initial?: Product
    prefillCategory?: string
    onClose: () => void
}

export function ProductForm({ initial, prefillCategory, onClose }: ProductFormProps) {
    const dispatch = useAppDispatch()

    const starter: Product = initial || {
        id: `PRD-${Date.now()}`,
        name: '',
        sku: '',
        category: prefillCategory ?? '',
        price: '$0.00',
        stock: 0,
        status: 'draft',
        trend: '-',
    }

    const [product, setProduct] = useState<Product>(starter)

    const handleSave = () => {
        if (initial) {
            dispatch(updateProduct(product))
        } else {
            dispatch(addProduct(product))
        }
        onClose()
    }

    return (
        <div className="space-y-4">
            <div>
                <label className="block text-sm font-medium">Name</label>
                <Input value={product.name} onChange={(e) => setProduct({ ...product, name: e.target.value })} />
            </div>
            <div>
                <label className="block text-sm font-medium">SKU</label>
                <Input value={product.sku} onChange={(e) => setProduct({ ...product, sku: e.target.value })} />
            </div>
            <div>
                <label className="block text-sm font-medium">Category</label>
                <Select
                    value={product.category}
                    onValueChange={(v) => setProduct({ ...product, category: v })}
                >
                    <SelectTrigger>
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        {getCategorySlugs().map((slug) => (
                            <SelectItem key={slug} value={getDisplayName(slug)}>
                                {getDisplayName(slug)}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium">Price</label>
                    <Input value={product.price} onChange={(e) => setProduct({ ...product, price: e.target.value })} />
                </div>
                <div>
                    <label className="block text-sm font-medium">Stock</label>
                    <Input
                        type="number"
                        value={product.stock}
                        onChange={(e) => setProduct({ ...product, stock: Number(e.target.value) })}
                    />
                </div>
            </div>
            <div>
                <label className="block text-sm font-medium">Status</label>
                <Select
                    value={product.status}
                    onValueChange={(v) => setProduct({ ...product, status: v })}
                >
                    <SelectTrigger>
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="archived">Archived</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="flex justify-end gap-2">
                <Button variant="ghost" onClick={onClose}>
                    Cancel
                </Button>
                <Button onClick={handleSave}>{initial ? 'Update' : 'Add'} product</Button>
            </div>
        </div>
    )
}
