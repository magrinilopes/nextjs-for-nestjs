'use client';

import { useRef, useState, useTransition } from 'react';
import { Button } from '@/components/Button';
import { ImageUpIcon } from 'lucide-react';
import { toast } from 'react-toastify';
import { uploadImageAction } from '@/actions/upload/upload-image-action';

type ImageUploaderProps = {
  disabled?: boolean;
};

export function ImageUploader({ disabled = false }: ImageUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, startUploadImagem] = useTransition();
  const [imgUrl, setImgUrl] = useState('');

  function handleChooseFile() {
    if (!fileInputRef.current) return;

    fileInputRef.current.click();
  }

  function handleChange() {
    toast.dismiss();

    if (!fileInputRef.current) {
      setImgUrl('');
      return;
    }

    const fileInput = fileInputRef.current;
    const file = fileInput?.files?.[0];

    if (!file) {
      setImgUrl('');
      return;
    }

    const uploadMaxSize =
      Number(process.env.NEXT_PUBLIC_IMAGE_UPLOADER_MAX_SIZE) || 921600;

    if (file.size > uploadMaxSize) {
      const readableMaxSize = (uploadMaxSize / 1024).toFixed(2);
      toast.error(`Imagem muito grande. Máximo: ${readableMaxSize}KB.`);

      fileInput.value = '';
      setImgUrl('');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    //TODO: Criar a action de envio de arquivo
    startUploadImagem(async () => {
      const result = await uploadImageAction(formData);

      if (result.error) {
        toast.error(result.error);
        fileInput.value = '';
        setImgUrl('');
        return;
      }

      setImgUrl(result.url);
      toast.success('Imagem enviada com sucesso!');
    });

    fileInput.value = '';
  }

  return (
    <div className='flex flex-col gap-4 py-4'>
      <Button
        type='button'
        className='self-start'
        disabled={isUploading || disabled}
        onClick={handleChooseFile}
      >
        <ImageUpIcon />
        Enviar imagem
      </Button>

      {!!imgUrl && (
        <div className='flex flex-col gap-4'>
          <p>URL: {imgUrl}</p>

          {/* eslint-disable-next-line */}
          <img className='rounded-lg' src={imgUrl} />
        </div>
      )}

      <input
        onChange={handleChange}
        disabled={isUploading || disabled}
        ref={fileInputRef}
        className='hidden'
        type='file'
        name='file'
        accept='image/*'
      />
    </div>
  );
}
