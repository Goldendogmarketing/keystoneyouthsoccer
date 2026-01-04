import { useState, useRef, useEffect } from 'react';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { Card, CardContent } from '~/components/ui/card';
import { Pen, Type, RotateCcw, Check } from 'lucide-react';

interface SignatureCaptureProps {
  value: string;
  onChange: (signature: string) => void;
  signerName: string;
  error?: string;
}

type SignatureMode = 'adopt' | 'draw';

export function SignatureCapture({ value, onChange, signerName, error }: SignatureCaptureProps) {
  const [mode, setMode] = useState<SignatureMode>('adopt');
  const [typedName, setTypedName] = useState('');
  const [isDrawing, setIsDrawing] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const lastPointRef = useRef<{ x: number; y: number } | null>(null);

  // Initialize canvas
  useEffect(() => {
    if (mode === 'draw' && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.strokeStyle = '#1e3a5f';
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
      }
    }
  }, [mode]);

  // Handle adopt signature
  const handleAdoptSignature = () => {
    if (typedName.trim()) {
      // Create a signature representation
      const signatureData = `ADOPTED:${typedName.trim()}:${new Date().toISOString()}`;
      onChange(signatureData);
    }
  };

  // Get canvas coordinates
  const getCoordinates = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return null;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    if ('touches' in e) {
      const touch = e.touches[0];
      return {
        x: (touch.clientX - rect.left) * scaleX,
        y: (touch.clientY - rect.top) * scaleY,
      };
    } else {
      return {
        x: (e.clientX - rect.left) * scaleX,
        y: (e.clientY - rect.top) * scaleY,
      };
    }
  };

  // Drawing handlers
  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    const coords = getCoordinates(e);
    if (coords) {
      setIsDrawing(true);
      lastPointRef.current = coords;
    }
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    if (!isDrawing || !canvasRef.current || !lastPointRef.current) return;

    const ctx = canvasRef.current.getContext('2d');
    const coords = getCoordinates(e);
    if (!ctx || !coords) return;

    ctx.beginPath();
    ctx.moveTo(lastPointRef.current.x, lastPointRef.current.y);
    ctx.lineTo(coords.x, coords.y);
    ctx.stroke();
    lastPointRef.current = coords;
  };

  const stopDrawing = () => {
    if (isDrawing && canvasRef.current) {
      setIsDrawing(false);
      lastPointRef.current = null;
      // Save canvas as data URL
      const dataUrl = canvasRef.current.toDataURL('image/png');
      onChange(dataUrl);
    }
  };

  const clearCanvas = () => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        onChange('');
      }
    }
  };

  const isAdoptedSignature = value.startsWith('ADOPTED:');
  const isDrawnSignature = value.startsWith('data:image');

  return (
    <div className="space-y-4">
      <Label className="text-base font-semibold">
        Electronic Signature <span className="text-destructive">*</span>
      </Label>

      {/* Mode Selection */}
      <div className="flex gap-2">
        <Button
          type="button"
          variant={mode === 'adopt' ? 'default' : 'outline'}
          onClick={() => setMode('adopt')}
          className="flex-1"
        >
          <Type className="mr-2 h-4 w-4" />
          Adopt Signature
        </Button>
        <Button
          type="button"
          variant={mode === 'draw' ? 'default' : 'outline'}
          onClick={() => setMode('draw')}
          className="flex-1"
        >
          <Pen className="mr-2 h-4 w-4" />
          Draw Signature
        </Button>
      </div>

      {/* Adopt Signature Mode */}
      {mode === 'adopt' && (
        <Card>
          <CardContent className="pt-6 space-y-4">
            <div className="rounded-lg bg-muted/50 p-4 text-sm text-muted-foreground">
              <p className="font-medium text-foreground mb-2">Signature Adoption Disclaimer</p>
              <p>
                By typing your name below and clicking "Adopt Signature", you agree that your typed
                name constitutes your legal electronic signature. This signature has the same legal
                validity as a handwritten signature under the Electronic Signatures in Global and
                National Commerce Act (E-SIGN) and the Uniform Electronic Transactions Act (UETA).
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="typed-signature">Type your full legal name</Label>
              <Input
                id="typed-signature"
                placeholder={signerName || 'Enter your full name'}
                value={typedName}
                onChange={(e) => setTypedName(e.target.value)}
              />
            </div>

            {typedName && (
              <div className="space-y-2">
                <Label>Signature Preview</Label>
                <div className="flex h-24 items-center justify-center rounded-lg border-2 border-dashed bg-white">
                  <span
                    className="text-3xl text-primary"
                    style={{ fontFamily: 'cursive, "Brush Script MT", "Segoe Script"' }}
                  >
                    {typedName}
                  </span>
                </div>
              </div>
            )}

            <Button
              type="button"
              onClick={handleAdoptSignature}
              disabled={!typedName.trim()}
              className="w-full"
            >
              <Check className="mr-2 h-4 w-4" />
              Adopt This Signature
            </Button>

            {isAdoptedSignature && (
              <div className="flex items-center gap-2 text-sm text-success">
                <Check className="h-4 w-4" />
                Signature adopted successfully
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Draw Signature Mode */}
      {mode === 'draw' && (
        <Card>
          <CardContent className="pt-6 space-y-4">
            <div className="rounded-lg bg-muted/50 p-4 text-sm text-muted-foreground">
              <p>
                Use your finger (on mobile) or mouse (on desktop) to draw your signature below.
                Your drawn signature will be captured and stored securely.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Draw your signature</Label>
                <Button type="button" variant="ghost" size="sm" onClick={clearCanvas}>
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Clear
                </Button>
              </div>
              <div className="rounded-lg border-2 border-dashed bg-white p-1">
                <canvas
                  ref={canvasRef}
                  width={500}
                  height={150}
                  className="w-full cursor-crosshair touch-none"
                  style={{ height: '150px' }}
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                  onTouchStart={startDrawing}
                  onTouchMove={draw}
                  onTouchEnd={stopDrawing}
                />
              </div>
              <p className="text-xs text-muted-foreground text-center">
                Sign within the box above
              </p>
            </div>

            {isDrawnSignature && (
              <div className="flex items-center gap-2 text-sm text-success">
                <Check className="h-4 w-4" />
                Signature captured
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {error && <p className="text-sm text-destructive">{error}</p>}

      {/* Signature status */}
      {value && (
        <div className="rounded-lg bg-success/10 p-3 text-sm text-success">
          <Check className="inline mr-2 h-4 w-4" />
          {isAdoptedSignature
            ? `Signature adopted by: ${value.split(':')[1]}`
            : 'Signature captured successfully'}
        </div>
      )}
    </div>
  );
}
