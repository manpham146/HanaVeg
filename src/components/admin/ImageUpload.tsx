'use client';

import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { Button } from '@/components/ui/button';

export function ImageUpload({
    currentImageUrl,
    onUploadSuccess
}: {
    currentImageUrl: string | null;
    onUploadSuccess: (url: string) => void;
}) {
    const [uploading, setUploading] = useState(false);
    const supabase = createClient();

    const uploadImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
        try {
            setUploading(true);

            if (!event.target.files || event.target.files.length === 0) {
                throw new Error('You must select an image to upload.');
            }

            const file = event.target.files[0];
            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random()}.${fileExt}`;
            const filePath = `${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('menu-images')
                .upload(filePath, file);

            if (uploadError) {
                throw uploadError;
            }

            const { data } = supabase.storage
                .from('menu-images')
                .getPublicUrl(filePath);

            onUploadSuccess(data.publicUrl);
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : 'Upload failed';
            alert(message);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="space-y-4">
            {currentImageUrl && (
                <div className="mb-4">
                    <img src={currentImageUrl} alt="Current item" className="w-32 h-32 object-cover rounded-md" />
                </div>
            )}
            <div className="flex items-center space-x-2">
                <Button type="button" variant="outline" className="relative h-10 w-40" disabled={uploading}>
                    <input
                        type="file"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        accept="image/*"
                        onChange={uploadImage}
                        disabled={uploading}
                    />
                    {uploading ? 'Uploading...' : 'Choose Image'}
                </Button>
            </div>
        </div>
    );
}
