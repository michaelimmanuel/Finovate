import { Modal } from "@/components/ui/modal";
import React from "react";

export function NewsModal({ modalNews, onClose }: { modalNews: any, onClose: () => void }) {
  if (!modalNews) return null;
  return (
    <Modal open={!!modalNews} onClose={onClose}>
      <div className="w-[75vw] max-w-5xl mx-auto py-20 h-screen">
        {modalNews.imageSrc && (
          <img src={modalNews.imageSrc} alt={modalNews.imageAlt || modalNews.title} className="w-full rounded-lg mb-4" />
        )}
        {modalNews.sponsoredBrand && (
          <div className="text-xs text-muted-foreground mt-2">Sponsored by {modalNews.sponsoredBrand}</div>
        )}
        <h2 className="font-heading text-2xl mb-2">{modalNews.title}</h2>
        <div className="text-xs text-muted-foreground mb-2">{modalNews.date} • John Doe {modalNews.tag && <>• {modalNews.tag}</>}</div>
        <div className="text-base mb-4">{modalNews.summary}</div>

        <div className="text-justify">
        <p className="text-sm leading-relaxed mb-2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, urna eu tincidunt consectetur, nisi nisl aliquam enim, nec dictum urna quam nec urna. Proin ac neque nec nisi cursus finibus. Mauris euismod, sapien nec laoreet cursus, enim erat dictum urna, at cursus enim erat nec urna. Sed euismod, urna eu tincidunt consectetur, nisi nisl aliquam enim, nec dictum urna quam nec urna. Proin ac neque nec nisi cursus finibus. Mauris euismod, sapien nec laoreet cursus, enim erat dictum urna, at cursus enim erat nec urna.
        </p>
        <p className="text-sm leading-relaxed mb-2">
            Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Integer euismod, urna eu tincidunt consectetur, nisi nisl aliquam enim, nec dictum urna quam nec urna. Proin ac neque nec nisi cursus finibus. Mauris euismod, sapien nec laoreet cursus, enim erat dictum urna, at cursus enim erat nec urna.
        </p>
        <p className="text-sm leading-relaxed mb-2">
        Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Suspendisse potenti. Etiam euismod, urna eu tincidunt consectetur, nisi nisl aliquam enim, nec dictum urna quam nec urna, nec dictum urna quam nec urna.
        </p>
        <p className="text-sm leading-relaxed mb-2">
        Integer euismod, urna eu tincidunt consectetur, nisi nisl aliquam enim, nec dictum urna quam nec urna. Proin ac neque nec nisi cursus finibus. Mauris euismod, sapien nec laoreet cursus, enim erat dictum urna, at cursus enim erat nec urna.
        </p>
        <p className="text-sm leading-relaxed mb-2">
        Nullam ac urna eu felis dapibus condimentum sit amet a augue. Sed non neque elit. Sed ut imperdiet nisi. Proin condimentum fermentum nunc. Etiam pharetra, erat sed fermentum feugiat, velit mauris egestas quam, ut aliquam massa nisl quis neque.
        </p>
        <p className="text-sm leading-relaxed mb-2">
        Mauris euismod, sapien nec laoreet cursus, enim erat dictum urna, at cursus enim erat nec urna. Sed euismod, urna eu tincidunt consectetur, nisi nisl aliquam enim, nec dictum urna quam nec urna.
        </p>
        <p className="text-sm leading-relaxed mb-2">
        Etiam euismod, urna eu tincidunt consectetur, nisi nisl aliquam enim, nec dictum urna quam nec urna. Proin ac neque nec nisi cursus finibus. Mauris euismod, sapien nec laoreet cursus, enim erat dictum urna, at cursus enim erat nec urna.
        </p>
        </div>
        
      </div>
    </Modal>
  );
}
